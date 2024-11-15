import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User]), RolesModule],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
