import { Body, Controller, Post } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
    constructor(private readonly appointmentsService: AppointmentsService) { };
    
    @Post('schedule')
    async scheduleAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
        return this.appointmentsService.createAppointment(createAppointmentDto);
    }
}
