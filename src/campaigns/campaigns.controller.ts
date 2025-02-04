import { Controller, Get, Param } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';

@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignService: CampaignsService) {}

  @Get()
  getAll() {
    return this.campaignService.getAll();
  }

  @Get(':id')
  getOne(@Param() params: { id: string }) {
    return this.campaignService.getOne(params.id);
  }
}
