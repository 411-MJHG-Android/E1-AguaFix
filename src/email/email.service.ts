import { Injectable, Logger } from '@nestjs/common';
import 'dotenv/config';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import { envs } from '../config/envs';

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name);
    private readonly transporter: Transporter;

    constructor(){
        this.transporter = nodemailer.createTransport({
            host: envs.MAIL_HOST, 
            port: envs.MAIL_PORT,
            secure: envs.MAIL_PORT === 465,
            auth: {
                user: envs.MAIL_USER,
                pass: envs.MAIL_PASS,
            },
        });
    }

    //Envio del correo
    async sendEmail(to: string, subject: string, template: string): Promise<boolean>{
        try{
            await this.transporter.sendMail({
                from: envs.MAIL_FROM,
                to,
                subject,
                html: template,
            });

            this.logger.log(`Correo enviado correctamente a: ${to}`);
            return true;
        } catch(error){
            this.logger.error(`Error al enviar a ${to}`, error);
            return false;
        }
    }

}
