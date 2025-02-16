import { z } from 'zod';
import { createZodDto } from 'nestjs-zod/dto';

export const createCampaignSchema = z.object({
  content: z.string().min(1),
  title: z.string().min(1),
});

export class CreateCampaignDto extends createZodDto(createCampaignSchema) {}
