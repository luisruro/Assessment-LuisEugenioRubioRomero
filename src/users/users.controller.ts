import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('users')
@Auth([Role.ADMIN])
export class UsersController {
    constructor(private readonly usersService: UsersService) { };

    @Auth([Role.PATIENT])
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.createUser(createUserDto);
    }

    @Get()
    async findAll() {
        return await this.usersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
        return await this.usersService.findOne(id);
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
        await this.usersService.deleteUser(id);
    }

    @Patch() 
    async updateUser(@Body() updateUserDto: UpdateUserDto, @Param('id', ParseUUIDPipe) id: string) {
        await this.usersService.updateUser(id, updateUserDto);
    }
}
