import { Injectable } from "@nestjs/common";
import { JobPortal } from "@prisma/client";
import { PrismaService } from "src/database/database.service";





@Injectable()
export class JobService {

    constructor (private readonly prisma: PrismaService) {}


  create(jobPortalDTO: Pick<JobPortal, 'label' | 'baseUrl'>) {
    return this.prisma.jobPortal.create({
      data: {
        label: jobPortalDTO.label,
        baseUrl: jobPortalDTO.baseUrl,
      },
    });
  }

    async findAll() {
        return this.prisma.jobPortal.findMany({
            include: {
                parsing: true
            }
        })
    }

    async getOne(id: string) {
        return this.prisma.jobPortal.findUnique({
            where: {
                id,
            }
        })
    }

}