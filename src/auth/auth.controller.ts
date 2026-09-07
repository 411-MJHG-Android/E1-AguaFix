import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/user.dto";
import { BodyResponse } from "../reports/dto/body-response.dto";
import { CreateLoginDto } from "./dto/login.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto){
        const response: BodyResponse = {
        status: 201,
        error: false,
        data: undefined,
    };

    try {
        const user = await this.authService.register(createUserDto);
        response.data = user;
        return response;
    }catch (e: any){
        response.status = e.status || 500;
        response.error = true;
        response.errorMessage = e.message || 'Error al registrar el usuario';
        return response;
    }
}

    @Post('login')
    async login(@Body() createLoginDto: CreateLoginDto){
        const response: BodyResponse = {
            status: 200,
            error: false,
            data: undefined,
        };

        try {
            const result = await this.authService.login(createLoginDto);
            response.data = result;
            return response;
        } catch (e: any){
            response.status = e.status || 400;
            response.error = true;
            response.errorMessage = e.message || 'Error al iniciar sesión';
            return response;
        }
    }
}