import { BadRequestException, Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ReportService } from "./reports.service";
import { BodyResponse } from "./dto/body-response.dto";
import { Get } from "@nestjs/common";
import { CreateReportDto } from "./dto/report.dto";
import { generateReportTemplate } from "./templates/report.template";
import { EmailService } from "../email/email.service";
import { envs } from "../config/envs";
import { StorageService } from "../storage/storage.service";
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('reports')
export class ReportController {
    constructor(
        private reportService: ReportService,
        private emailService: EmailService,
        private storageService: StorageService
    ){}

    @Get()
    async getAllReports(){
        const response : BodyResponse = {
            status: 200,
            error: false,
            errorMessage: undefined,
            data: undefined
        }
        try{
            const reports = await this.reportService.getAllReports();
            response.data = reports;
            return response;
        }
        catch(e){
            console.error('Error detallado: ', e);
            response.status = 500;
            response.error = true;
            response.errorMessage = "Ocurrrio un error";
            return response;
        }

    }

    @Post()
    @UseInterceptors(FileInterceptor('photo'))
        async createReport(
            @UploadedFile() file: Express.Multer.File,
            @Body() createReportDto: CreateReportDto
        ){
            const response: BodyResponse = {
                status: 201,
                error: false,
                errorMessage: undefined,
                data: undefined
            };
            try{
                if(!file){
                    throw new BadRequestException('El de la foto es obligatorio')
                }
                 //Subir la foto a AWS
                const photoUrl = await this.storageService.uploadFile(file, 'reports');
                const report = await this.reportService.createReport(createReportDto, photoUrl);
               

                //Genera el HTML y envia el correo a la cuadrilla
                const template = generateReportTemplate(createReportDto, photoUrl);
                await this.emailService.sendEmail(
                    envs.MAINTENANCE_CREW_EMAIL,
                    `Aviso: Fuega de Agua #${report.id} - Severidad ${report.severity.toUpperCase}`,
                    template,
                );
                response.data = report;
                return response;
            } catch(e){
                console.error('Error detallado en createAnimal:', e);
                response.status = 500;
                response.error = true;
                response.errorMessage = "Ocurrio un error";
                return response;
            }
        }
}