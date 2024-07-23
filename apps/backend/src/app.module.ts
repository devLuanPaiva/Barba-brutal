import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [DbModule, ServiceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
