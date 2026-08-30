// ARKLINTECH Backend Validation & Security Utilities

export interface InquiryInput {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  industry?: string;
  service?: string;
  requirement: string;
  budget?: string;
}

export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim().toLowerCase()) && email.length <= 254;
}

export function sanitizeString(val: unknown, maxLen = 2000): string {
  if (typeof val !== 'string') return '';
  return val.trim().slice(0, maxLen).replace(/<[^>]*>?/gm, '');
}

export function validateInquiryPayload(body: unknown): {
  valid: boolean;
  errors: string[];
  data?: InquiryInput;
} {
  if (!body || typeof body !== 'object') {
    return { valid: false, errors: ['Invalid request payload format.'] };
  }

  const payload = body as Record<string, unknown>;
  const errors: string[] = [];

  const name = sanitizeString(payload.name, 120);
  const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';
  const requirement = sanitizeString(payload.requirement, 5000);
  const company = sanitizeString(payload.company, 150);
  const phone = sanitizeString(payload.phone, 50);
  const industry = sanitizeString(payload.industry, 100);
  const service = sanitizeString(payload.service, 100);
  const budget = sanitizeString(payload.budget, 80);

  if (!name || name.length < 2) {
    errors.push('Full name is required (minimum 2 characters).');
  }

  if (!validateEmail(email)) {
    errors.push('A valid work email address is required.');
  }

  if (!requirement || requirement.length < 10) {
    errors.push('System requirements description is required (minimum 10 characters).');
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    data: {
      name,
      company: company || undefined,
      email,
      phone: phone || undefined,
      industry: industry || undefined,
      service: service || undefined,
      requirement,
      budget: budget || undefined,
    },
  };
}

// In-Memory Token Bucket Rate Limiter (Per IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(ip: string, maxRequests = 10, windowMs = 60000): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (entry.count >= maxRequests) {
    return false;
  }

  entry.count += 1;
  return true;
}
