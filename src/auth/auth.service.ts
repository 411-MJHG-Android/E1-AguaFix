import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/user.dto";
import * as bcrypt from 'bcryptjs';
import { CreateLoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
    @InjectRepository(User)
        private userRepository : Repository<User>
    ){}

    async register(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
        const existingUser = await this.userRepository.findOne({
            where: {email: createUserDto.email},
        });
        if(existingUser){
            throw new BadRequestException('El correo ya se encuentra registrado')
        }

        //Hashear la contraseña con slat de 10 rondas
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(createUserDto.password, salt);

        const newUsuer = this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });
        const savedUser = await this.userRepository.save(newUsuer);
        //Excluir la contraseña en la respuesta
        const {password, ...userWithoutPassword } =savedUser;
        return userWithoutPassword;
    }

    async login(createloginDto: CreateLoginDto): Promise<{message: string; user: Omit<User, 'password'>}> {
        const user = await this.userRepository.findOne({
            where: {email: createloginDto.email},
        });

        //Validacion de la existencia del usuario
        if(!user){
            throw new BadRequestException('Correo o contraseña incorrectos');
        }

        //Verificar que la contraseña sea la misma
        const isPasswordValid = bcrypt.compareSync(createloginDto.password, user.password);
        if (!isPasswordValid){
            throw new BadRequestException('Correo o contraseña invalidas');
        }

        const{password, ...userWithoutPassword} = user;
        return{
            message: 'Inicios de secion exitoso',
            user: userWithoutPassword,
        };
    }
}