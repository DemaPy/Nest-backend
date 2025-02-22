import { createZodDto } from 'nestjs-zod/dto';
import { z } from 'zod';

const registerSchema = z.object({
  email: z
    .string()
    .email()
    .transform((value) => value.toLowerCase()),
  password: z.string().min(8),
});

export class RegisterDTO extends createZodDto(registerSchema) {}