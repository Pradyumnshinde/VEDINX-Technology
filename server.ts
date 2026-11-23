import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import dotenv from 'dotenv';

dotenv.config();

const PORT = 3000;
const HOST = '0.0.0.0';

interface ContactPayload {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  serviceRequired: string;
  projectDescription: string;
}

interface StoredEnquiry extends ContactPayload {
  referenceId: string;
  submittedAt: string;
  deliveryChannels: string[];
}

function validateContactPayload(body: unknown): {
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

  if (fullName.length < 2) {
    errors.fullName = 'Please enter your full name.';
  }
  if (businessName.length < 2) {
    errors.businessName = 'Please enter your business or organization name.';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!/^[+\d\s().-]{7,25}$/.test(phone)) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (!serviceRequired) {
    errors.serviceRequired = 'Please select the service you require.';
  }
  if (projectDescription.length < 15) {
    errors.projectDescription = 'Please share a brief overview of your project (at least 15 characters).';
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: {},
    data: {
      fullName,
      businessName,
      email,
      phone,
      serviceRequired,
      projectDescription,
    },
  };
}

function generateReferenceId(): string {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomPart = crypto.randomBytes(2).toString('hex').toUpperCase();
  return `VDX-${datePart}-${randomPart}`;
}

async function persistEnquiry(enquiry: StoredEnquiry): Promise<void> {
  const dataDir = path.resolve(process.cwd(), 'data');
  const filePath = path.join(dataDir, 'enquiries.json');
  await fs.mkdir(dataDir, { recursive: true });

  let existing: StoredEnquiry[] = [];
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      existing = parsed as StoredEnquiry[];
    }
  } catch {
    existing = [];
  }

  existing.push(enquiry);
  await fs.writeFile(filePath, JSON.stringify(existing, null, 2), 'utf-8');
}

async function forwardEnquiry(enquiry: StoredEnquiry): Promise<string[]> {
  const channels = ['local-store'];

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (webhookUrl) {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiry),
    });
    if (res.ok) {
      channels.push('webhook');
    }
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || 'vednixtech@gmail.com';
  if (resendApiKey && recipientEmail) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'VEDNIX Website <onboarding@resend.dev>',
        to: [recipientEmail],
        reply_to: enquiry.email,
        subject: `New Project Enquiry [${enquiry.referenceId}] — ${enquiry.businessName}`,
        text: [
          `Reference: ${enquiry.referenceId}`,
          `Submitted: ${enquiry.submittedAt}`,
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
    if (res.ok) {
      channels.push('email');
    }
  }

  return channels;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'VEDNIX Technologies' });
  });

  app.post('/api/contact', async (req, res) => {
    const validation = validateContactPayload(req.body);
    if (!validation.valid || !validation.data) {
      res.status(400).json({
        success: false,
        message: 'Please review the highlighted fields and try again.',
        errors: validation.errors,
      });
      return;
    }

    const referenceId = generateReferenceId();
    const submittedAt = new Date().toISOString();

    const enquiry: StoredEnquiry = {
      ...validation.data,
      referenceId,
      submittedAt,
      deliveryChannels: [],
    };

    try {
      const channels = await forwardEnquiry(enquiry);
      enquiry.deliveryChannels = channels;
      await persistEnquiry(enquiry);

      res.status(201).json({
        success: true,
        referenceId,
        submittedAt,
        message: 'Your enquiry has been received. A member of our team will respond within one business day.',
      });
    } catch (error) {
      console.error('Failed to process contact enquiry:', error);
      res.status(500).json({
        success: false,
        message: 'We could not record your enquiry right now. Please try again or reach out via WhatsApp or email.',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`VEDNIX Technologies server listening on http://${HOST}:${PORT}`);
  });
}

startServer();
