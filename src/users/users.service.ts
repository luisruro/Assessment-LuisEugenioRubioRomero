import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from "typeorm";
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>,
        private readonly rolesService: RolesService
    ) { };

    async createUser(createUserDto: CreateUserDto) {

        //Searching the role
        const roleFound = await this.rolesService.getRoleByRole(createUserDto.role)

        if (!roleFound) {
            throw new HttpException('Role not found, enter a valid role', HttpStatus.NOT_FOUND)
        }

        const createdUser = this.usersRepository.create(
            {
                ...createUserDto,
                role: roleFound
            }
        );

        console.log('Created user from users.service create method', createdUser);

        return await this.usersRepository.save(createdUser);
    }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find({
            relations: ['role']
        });
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.usersRepository.findOneBy({ email })
    }

    async findOneByEmailWithPassword(email: string) {
        return await this.usersRepository.findOne({
            where: { email },
            select: ['id', 'email', 'password', 'role', 'creationDate'],
            relations: ['role']
        });
    }

    async findOne(id: string) {
        const userFound = await this.usersRepository.findOne({
            where: {
                id
            },
            relations: ['role']
        });

        if (!userFound) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        return userFound;
    }

    async deleteUser(id: string) {
        const result = await this.usersRepository.delete({ id });

        if (result.affected === 0) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return result;
    }

    async updateUser(id: string, user: UpdateUserDto) {
        const userFound = await this.usersRepository.findOne({
            where: {
                id
            }
        });

        if (!userFound) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        // Searches the role before updating the user
        const roleFound = await this.rolesService.getRoleByRole(user.role);

        if (!roleFound) {
            throw new HttpException('Role not found, enter a valid role', HttpStatus.NOT_FOUND)
        }

        // Updates the user including the role
        return this.usersRepository.update(id, {
            ...user,
            role: roleFound,
        })
    }
}
