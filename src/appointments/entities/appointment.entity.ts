import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('appointments')
export class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'timestamp'})
    startTime: Date;

    @Column({type: 'timestamp'})
    endTime: Date;

    @Column()
    reason: string;

    @ManyToOne(() => User, user => user.patientsAppointments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'patientId' })
    patient: User;

    @ManyToOne(() => User, user => user.doctorsAppointments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'doctorId' })
    doctor: User;
}