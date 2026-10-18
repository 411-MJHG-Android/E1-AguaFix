import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/data-source';
import { EmailService } from './email/email.service';
import { ReportModule } from './reports/reports.module';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { StorageService } from './storage/storage.service';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ReportModule,
    EmailModule,
    AuthModule,
    StorageModule
  ],
  controllers: [AppController],
  providers: [AppService, StorageService],
})
export class AppModule {}
