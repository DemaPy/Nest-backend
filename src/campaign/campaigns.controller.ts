import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from 'src/utils/lib/dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignService: CampaignsService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAll() {
    return this.campaignService.getAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getOne(@Param() params: { id: string }) {
    return this.campaignService.getOne(params.id);
  }

  @Post()
  create(@Body() createCampaignDto: CreateCampaignDto) {
    console.log(createCampaignDto);
    return this.campaignService.create(createCampaignDto);
  }
}
