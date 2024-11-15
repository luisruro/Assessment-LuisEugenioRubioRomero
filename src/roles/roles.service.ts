import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
    constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) { }

    async createRole(role: CreateRoleDto) {
        const roleFound = await this.roleRepository.findOne({
            where: {
                role: role.role
            }
        });

        console.log(roleFound);

        if (roleFound) {
            throw new HttpException(`Role: ${role.role} already exists.`, HttpStatus.CONFLICT);
        }

        const newRole = this.roleRepository.create(role);
        const saveRole = await this.roleRepository.save(newRole);

        return saveRole;
    }

    async getAllRoles() {
        return await this.roleRepository.find({
            relations: ['users']
        });
    }

    async getRoleById(id: string) {
        const roleFound = this.roleRepository.findOne({
            where: {
                id
            },
            relations: ['users']
        });

        if (!roleFound) {
            throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
        }

        return roleFound;
    }

    async getRoleByRole(role) {
        const normalizedRole = role.toLowerCase().trim();

        const roleFound = await this.roleRepository.findOne({
            where: {
                role: normalizedRole
            }
        });

        if (!roleFound) {
            throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
        }

        return roleFound;
    }

    async deleteRole(id: string) {
        const result = await this.roleRepository.delete({id});

        if (result.affected === 0) {
            throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
        }

        return result;
    }

    async updateRole(id: string, role: UpdateRoleDto) {
        const roleFound = await this.roleRepository.findOne({
            where: {
                id
            }
        });

        if (!roleFound) {
            throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
        }

        return this.roleRepository.update(id, role);
    }
}
