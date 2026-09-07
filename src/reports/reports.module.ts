import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WaterReport } from "./entity/report.entity";
import { EmailModule } from "../email/email.module";
import { ReportController } from "./reports.controller";
import { ReportService } from "./reports.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([WaterReport]),
        EmailModule
    ],
    controllers: [ReportController],
    providers: [ReportService]
})

export class ReportModule {}