import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [AppointmentsService],
  controllers: [AppointmentsController],
  imports: [TypeOrmModule.forFeature([Appointment, User]), UsersModule]
})
export class AppointmentsModule {}
