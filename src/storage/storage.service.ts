import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { envs } from '../config/envs';
import { Express } from 'express';
import { randomUUID } from 'crypto';
import 'multer';

@Injectable()
export class StorageService {
    private logger = new Logger(StorageService.name);
    private s3Client: S3Client; 

    constructor(){
        this.s3Client = new S3Client({
            region: envs.AWS_REGION,
            credentials: {
                accessKeyId: envs.AWS_ACCESS_KEY_ID,
                secretAccessKey: envs.AWS_SECRET_ACCESS_KEY,
            },
        });
    }

    async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
        try{
            //Genera un nombre unico 
            const cleanFileName = file.originalname.replace(/\s+/g, '-');
            const key = `${folder}/${randomUUID()}-${cleanFileName}`;

            await this.s3Client.send(
                new PutObjectCommand({
                    Bucket: envs.AWS_BUCKET_NAME,
                    Key: key,
                    Body: file.buffer,
                    ContentType: file.mimetype,
                }), 
            ); 

            //Retornar la URL publica del objeto 
            return `https://${envs.AWS_BUCKET_NAME}.s3.${envs.AWS_REGION}.amazonaws.com/${key}`;
        } catch (error) {
            this.logger.error('Error al subir archivo a AWS S3: ', error);
            throw new InternalServerErrorException('No se pudo subir la imagen al servidor')
        }

    }
}
