import { Appointment } from "src/appointments/entities/appointment.entity";
import { Role } from "src/roles/entities/role.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 500 })
    name: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false, select: false })
    password: string;

    @ManyToOne(() => Role, role => role.users, {onDelete: 'CASCADE'})
    @JoinColumn()
    role: Role

    @CreateDateColumn()
    creationDate: Date;

    @OneToMany(() => Appointment, appointment => appointment.doctor)
    doctorsAppointments: Appointment[];

    @OneToMany(() => Appointment, appointment => appointment.patient)
    patientsAppointments: Appointment[];
}