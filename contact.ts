interface Env {
  RESEND_API_KEY?: string;
  CONTACT_RECIPIENT_EMAIL?: string;
  CONTACT_WEBHOOK_URL?: string;
}

interface ContactPayload {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  serviceRequired: string;
  projectDescription: string;
}

function validatePayload(body: unknown): {
  valid: boolean;
  errors: Record<string, string>;
  data?: ContactPayload;
} {
  if (!body || typeof body !== 'object') {
    return { valid: false, errors: { form: 'Invalid request payload.' } };
  }

  const record = body as Record<string, unknown>;
  const fullName = typeof record.fullName === 'string' ? record.fullName.trim() : '';
  const businessName = typeof record.businessName === 'string' ? record.businessName.trim() : '';
  const email = typeof record.email === 'string' ? record.email.trim() : '';
  const phone = typeof record.phone === 'string' ? record.phone.trim() : '';
  const serviceRequired = typeof record.serviceRequired === 'string' ? record.serviceRequired.trim() : '';
  const projectDescription = typeof record.projectDescription === 'string' ? record.projectDescription.trim() : '';

  const errors: Record<string, string> = {};
  if (fullName.length < 2) errors.fullName = 'Please enter your full name.';
  if (businessName.length < 2) errors.businessName = 'Please enter your business or organization name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email address.';
  if (!/^[+\d\s().-]{7,25}$/.test(phone)) errors.phone = 'Please enter a valid phone number.';
  if (!serviceRequired) errors.serviceRequired = 'Please select the service you require.';
  if (projectDescription.length < 15) {
    errors.projectDescription = 'Please share a brief overview of your project (at least 15 characters).';
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: {},
    data: { fullName, businessName, email, phone, serviceRequired, projectDescription },
  };
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ success: false, message: 'Invalid JSON request body.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const validation = validatePayload(body);
  if (!validation.valid || !validation.data) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Please review the highlighted fields and try again.',
        errors: validation.errors,
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomPart = crypto.randomUUID().slice(0, 4).toUpperCase();
  const referenceId = `VDX-${datePart}-${randomPart}`;
  const submittedAt = new Date().toISOString();
  const enquiry = { ...validation.data, referenceId, submittedAt };

  try {
    if (env.CONTACT_WEBHOOK_URL) {
      const webhookRes = await fetch(env.CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquiry),
      });
      if (!webhookRes.ok) {
        throw new Error(`Webhook delivery failed with status ${webhookRes.status}`);
      }
    }

    const recipientEmail = env.CONTACT_RECIPIENT_EMAIL || 'vednixtech@gmail.com';
    if (env.RESEND_API_KEY && recipientEmail) {
      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'VEDNIX Website <onboarding@resend.dev>',
          to: [recipientEmail],
          reply_to: enquiry.email,
          subject: `New Project Enquiry [${referenceId}] — ${enquiry.businessName}`,
          text: [
            `Reference: ${referenceId}`,
            `Submitted: ${submittedAt}`,
            `Full Name: ${enquiry.fullName}`,
            `Business Name: ${enquiry.businessName}`,
            `Email: ${enquiry.email}`,
            `Phone: ${enquiry.phone}`,
            `Service Required: ${enquiry.serviceRequired}`,
            '',
            'Project Description:',
            enquiry.projectDescription,
          ].join('\n'),
        }),
      });
      if (!emailRes.ok) {
        throw new Error(`Email delivery failed with status ${emailRes.status}`);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        referenceId,
        submittedAt,
        message: 'Your enquiry has been received. A member of our team will respond within one business day.',
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Cloudflare Pages contact handler error:', err);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Unable to deliver enquiry at the moment. Please contact us directly by email or WhatsApp.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
