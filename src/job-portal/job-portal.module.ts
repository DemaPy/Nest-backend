import { Module } from "@nestjs/common";
import { JobController } from "./job-portal.controller";
import { JobService } from "./job-portal.service";
import { PrismaModule } from "src/database/database.module";




@Module({
    imports: [PrismaModule],
    controllers: [JobController],
    providers: [JobService]
})
export class JobPortalModule {}