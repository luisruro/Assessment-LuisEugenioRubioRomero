import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
    constructor(private readonly appointmentsService: AppointmentsService) { };
    
    @Post('schedule/:patiendtId')
    async scheduleAppointment(@Param('patientId', ParseUUIDPipe) patientId: string, @Body() createAppointmentDto: CreateAppointmentDto) {
        return this.appointmentsService.createAppointment(patientId, createAppointmentDto);
    }
}
