import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppointmentRepository } from './appointment.repository';
import { AppointmentController } from './appointment.controller';
import { DbModule } from 'src/db/db.module';
import { UserModule } from 'src/user/user.module';
import { UserMidddleware } from 'src/user/user.middleware';

@Module({
  imports: [DbModule, UserModule],
  controllers: [AppointmentController],
  providers: [AppointmentRepository],
})
export class AppointmentModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMidddleware).forRoutes(AppointmentController);
  }
}
