import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'src/database/database.service';

@Injectable()
export class JobScanService {
  constructor(private prisma: PrismaService) {}

    websitesToParse = [
        {
            label: "Just Join IT",
            url: "https://justjoin.it/job-offers/all-locations/javascript",
            content: ""
        }
    ]

    // @Cron("30 * * * * *")
    async parseJobs() {
        const jobPortals = await this.prisma.jobPortal.findMany({
            include: {
                parsing: {
                    orderBy: {
                        "createdAt": 'desc'
                    },
                    take: 1
                }
            }
        });
        for (const jobPortal of jobPortals) {
            fetch(jobPortal.baseUrl).then(async (response) => {
                const text = await response.text();
                await this.prisma.jobPortalParsing.create({
                    data: {
                        url: jobPortal.baseUrl,
                        jobPortalId: jobPortal.id,
                        content: text,
                    }
                })
            })
        }
    }

}
