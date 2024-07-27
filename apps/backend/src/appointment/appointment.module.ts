import { Module } from '@nestjs/common';
import { AppointmentRepository } from './appointment.repository';
import { AppointmentController } from './appointment.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [AppointmentController],
  providers: [AppointmentRepository],
})
export class AppointmentModule {}
