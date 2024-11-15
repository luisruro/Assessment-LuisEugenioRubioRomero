import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { };

    async register({ password, email, name, role }: RegisterDto) {
        const userFound = await this.usersService.findOneByEmail(email);

        if (userFound) {
            throw new HttpException(`Email already registered ${userFound.email}`, HttpStatus.CONFLICT);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await this.usersService.createUser({
            name,
            email,
            password: hashedPassword,
            role
        });

        return {
            message: 'User created successfully'
        }
    }

    async login({email, password}: LoginDto) {
        const user = await this.usersService.findOneByEmailWithPassword(email);
        console.log('user from auth.service method login', user);

        if (!user) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        const payload = { email: user.email, role: user.role};
        console.log('payload from auth service: ', payload);

        const token = await this.jwtService.signAsync(payload)
        
        return {
            token: token,
            email: user.email
        }
    }
}
