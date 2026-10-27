import { describe, it, expect } from 'vitest';
import { contactFormSchema, recommendationFormSchema } from './validation';

describe('contactFormSchema', () => {
  it('should validate a valid contact form', () => {
    const result = contactFormSchema.safeParse({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello, I would like to work with you.',
    });
    expect(result.success).toBe(true);
  });

  it('should reject short name', () => {
    const result = contactFormSchema.safeParse({
      name: 'J',
      email: 'john@example.com',
      message: 'Hello, I would like to work with you.',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]!.message).toContain('at least 2 characters');
    }
  });

  it('should reject invalid email', () => {
    const result = contactFormSchema.safeParse({
      name: 'John Doe',
      email: 'not-an-email',
      message: 'Hello, I would like to work with you.',
    });
    expect(result.success).toBe(false);
  });

  it('should reject short message', () => {
    const result = contactFormSchema.safeParse({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hi',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((e) => e.path.includes('message'))).toBe(true);
    }
  });

  it('should make subject optional', () => {
    const result = contactFormSchema.safeParse({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello, I would like to work with you.',
    });
    expect(result.success).toBe(true);
  });
});

describe('recommendationFormSchema', () => {
  it('should validate a valid recommendation', () => {
    const result = recommendationFormSchema.safeParse({
      name: 'Jane Smith',
      role: 'Engineering Manager',
      company: 'TechCorp',
      content: 'Great developer with strong skills.',
    });
    expect(result.success).toBe(true);
  });

  it('should reject short content', () => {
    const result = recommendationFormSchema.safeParse({
      name: 'Jane Smith',
      content: 'Hi',
    });
    expect(result.success).toBe(false);
  });

  it('should make role and company optional', () => {
    const result = recommendationFormSchema.safeParse({
      name: 'Jane Smith',
      content: 'Great developer with strong skills.',
    });
    expect(result.success).toBe(true);
  });
});
