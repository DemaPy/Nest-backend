import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { JobService } from './job-portal.service';
import { responseObject } from 'src/utils/responseInterface';
import { JobPortal } from '@prisma/client';

@Controller('job-portal')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  async findAll() {
    try {
      return responseObject({ data: await this.jobService.findAll() });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Get('id')
  async getOne(@Param() id: string) {
    try {
      return responseObject({ data: await this.jobService.getOne(+id) });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  @Post()
  async create(@Body() jobPortal: Pick<JobPortal, 'label' | 'baseUrl'>) {
    try {
      console.log(jobPortal);
      return responseObject({ data: await this.jobService.create(jobPortal) });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
