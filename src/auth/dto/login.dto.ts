import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateLoginDto{
    @IsEmail({}, {message: 'El correo electronico no es valido'})
    email!: string;
    @IsString()
    @IsNotEmpty()
    password!: string;
}
