import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from 'src/utils/lib/dto';

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

  @Post()
  create(@Body() createCampaignDto: CreateCampaignDto) {
    console.log(createCampaignDto);
    return this.campaignService.create(createCampaignDto);
  }
}
