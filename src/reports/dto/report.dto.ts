import {IsIn, IsNotEmpty, IsString} from 'class-validator';

export class CreateReportDto{
    @IsString()
    @IsNotEmpty({ message: 'La dirección o referencia es requerida' })
    address!: string;
    @IsString()
    @IsNotEmpty({ message: 'La descripción del reporte es requerida' })
    description!: string;
    @IsString()
    @IsIn(['baja', 'media', 'alta'], {message: 'La severidad deberia ser: baja, mediana, alta'})
    severity!: string;
    @IsString()
    @IsNotEmpty({ message: 'El telefono de contacto es requerido' })
    reporterPhone: string;
}