import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";


export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    name!: string;
    @IsEmail({}, {message:'El correo electronico no es valido'})
    email!: string;
    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password: string;
    @IsBoolean()
    @IsOptional()
    isNotificationEnabled?: boolean;
}
