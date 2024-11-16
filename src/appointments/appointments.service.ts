import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AppointmentsService {
    constructor(
        @InjectRepository(Appointment) private readonly appointmentRepository: Repository<Appointment>,
        private readonly usersService: UsersService
    ) { };

    async isDoctorAvailable(doctorId: string, startTime: string, endTime: string): Promise<boolean> {
        const start = new Date(startTime);
        const end = new Date(endTime);

        const overlappingAppointments = await this.appointmentRepository.find({
            where: {
                doctorId,
                startTime: LessThan(end),
                endTime: MoreThan(start),
            }
        });

        return overlappingAppointments.length === 0;
    }

    async createAppointment(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {

        const { doctorId, startTime, endTime } = createAppointmentDto;

        const isAvailable = await this.isDoctorAvailable(doctorId, startTime, endTime);

        if (!isAvailable) {
            throw new ConflictException('Doctor is not available for the given time slot.');
        }

        const appointment = this.appointmentRepository.create({
            ...createAppointmentDto,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
        });
        return await this.appointmentRepository.save(appointment);
    }
}
