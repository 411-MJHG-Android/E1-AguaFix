import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WaterReport } from './entity/report.entity';
import { CreateReportDto } from './dto/report.dto';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(WaterReport)
    private reportRepository: Repository<WaterReport>,
  ) {}

  async getAllReports(): Promise<WaterReport[]> {
    return await this.reportRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async createReport(createReportDto: CreateReportDto): Promise<WaterReport> {
    const newReport = this.reportRepository.create(createReportDto);
    return await this.reportRepository.save(newReport);
  }
}