import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { UpdateRoleDto } from './dto/update-role.dto';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) { };

    @Get()
    getAllRoles() {
        return this.rolesService.getAllRoles();
    }

    @Get(':id')
    getRoleById(@Param('id', ParseUUIDPipe) id: string) {
        return this.rolesService.getRoleById(id);
    }

    @Delete(':id')
    deleteRole(@Param('id', ParseUUIDPipe) id: string) {
        return this.rolesService.deleteRole(id);
    }

    @Patch(':id')
    updateRole(@Param('id', ParseUUIDPipe) id: string, @Body() role: UpdateRoleDto) {
        return this.rolesService.updateRole(id, role);
    }

    @Post()
    createRole(@Body() newRole: CreateRoleDto) {
        return this.rolesService.createRole(newRole);
    }

}
