import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { UserMidddleware } from './user.middleware';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { BcryptProvider } from './bcrypt.provider';

@Module({
  imports: [DbModule],
  exports: [UserMidddleware, UserRepository],
  controllers: [UserController],
  providers: [UserMidddleware, UserRepository, BcryptProvider],
})
export class UserModule {}
