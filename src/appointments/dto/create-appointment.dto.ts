import { IsDate, IsNotEmpty, IsString, IsUUID, Matches } from "class-validator";

export class CreateAppointmentDto {
    @IsUUID()
    @IsNotEmpty()
    doctorId: string;

    @IsNotEmpty()
    @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,{ message: 'startTime must be in the format YYYY-MM-DDTHH:mm'})
    startTime: string;

    @IsNotEmpty()
    @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, { message: 'endTime must be in the format YYYY-MM-DDTHH:mm'})
    endTime: string;

    @IsString()
    @IsNotEmpty()
    reason: string;
}