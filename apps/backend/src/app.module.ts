import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { ServiceModule } from './service/service.module';
import { AppointmentModule } from './appointment/appointment.module';
import { AppointmentController } from './appointment/appointment.controller';

@Module({
  imports: [DbModule, ServiceModule, AppointmentModule],
  controllers: [AppointmentController],
  providers: [],
})
export class AppModule {}
