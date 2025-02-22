import { createZodDto } from 'nestjs-zod/dto';
import { z } from 'zod';

const userSchema = z.object({
  id: z.string(),
  email: z
    .string()
    .email()
    .transform((value) => value.toLowerCase()),
});

export class UserDTO extends createZodDto(userSchema) {}
