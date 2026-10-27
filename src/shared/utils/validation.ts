import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  subject: z.string().max(200, 'Subject is too long').optional(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message is too long'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const recommendationFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  role: z.string().max(100, 'Role is too long').optional(),
  company: z.string().max(100, 'Company is too long').optional(),
  content: z.string().min(10, 'Content must be at least 10 characters').max(600),
});

export type RecommendationFormData = z.infer<typeof recommendationFormSchema>;
