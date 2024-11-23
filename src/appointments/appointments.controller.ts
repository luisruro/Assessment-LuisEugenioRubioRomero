import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('appointments')
export class AppointmentsController {
    constructor(private readonly appointmentsService: AppointmentsService) { };
    
    @Auth([Role.PATIENT])
    @Post('schedule/:patiendtId')
    async scheduleAppointment(@Param('patientId') patientId: string, @Body() createAppointmentDto: CreateAppointmentDto) {
        return this.appointmentsService.createAppointment(patientId, createAppointmentDto);
    }
}
