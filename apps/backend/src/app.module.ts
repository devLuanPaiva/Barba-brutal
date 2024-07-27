import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { ServiceModule } from './service/service.module';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [DbModule, ServiceModule, AppointmentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
