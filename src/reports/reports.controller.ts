import { Body, Controller, Post } from "@nestjs/common";
import { ReportService } from "./reports.service";
import { BodyResponse } from "./dto/body-response.dto";
import { Get } from "@nestjs/common";
import { CreateReportDto } from "./dto/report.dto";
import { generateReportTemplate } from "./templates/report.template";
import { EmailService } from "../email/email.service";
import { envs } from "../config/envs";

@Controller('reports')
export class ReportController {
    constructor(
        private reportService: ReportService,
        private emailService: EmailService,
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
        async createReport(
            @Body() createReportDto: CreateReportDto
        ){
            const response: BodyResponse = {
                status: 201,
                error: false,
                errorMessage: undefined,
                data: undefined
            };
            try{
                const report = await this.reportService.createReport(createReportDto);

                //Genera el HTML y envia el correo a la cuadrilla
                const template = generateReportTemplate(createReportDto);
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