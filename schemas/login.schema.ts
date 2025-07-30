import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('ایمیل نامعتبر است'),
  password: z.string().min(6, 'پسورد باید حداقل 6 کاراکتر باشد'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
