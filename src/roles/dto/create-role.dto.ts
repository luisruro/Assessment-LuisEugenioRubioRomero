import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty({message: 'Role is required and must be a string'})
    role: string;
}