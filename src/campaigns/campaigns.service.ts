import { Injectable } from '@nestjs/common';
import { responseObject } from 'src/utils/responseInterface';

@Injectable()
export class CampaignsService {
  private campaigns = [
    {
      id: '1',
      title: 'Newsletter',
      content: '<p>Hello {{name}}</p>',
    },
    {
      id: '2',
      title: 'Test',
      content: '<p>Hello {{name}}</p>',
    },
  ];

  getAll() {
    return responseObject({ data: this.campaigns });
  }

  getOne(id: string) {
    const campaign = this.campaigns.find((campaign) => campaign.id === id);
    return responseObject({ data: campaign ?? null });
  }
}
