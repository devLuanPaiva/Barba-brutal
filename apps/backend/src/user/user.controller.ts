import { Body, Controller, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { BcryptProvider } from './bcrypt.provider';
import { User, UserLogin, UserRegister } from '@barba/core';
import * as jwt from 'jsonwebtoken';

@Controller('user')
export class UserController {
  constructor(
    private readonly repo: UserRepository,
    private readonly crypt: BcryptProvider,
  ) {}

  @Post('login')
  async login(
    @Body() data: { email: string; password: string },
  ): Promise<string> {
    const useCase = new UserLogin(this.repo, this.crypt);
    const user = await useCase.execute(data.email, data.password);
    const secret = process.env.JWT_SECRET!;
    return jwt.sign(user, secret, { expiresIn: '15d' });
  }
  @Post('register')
  async register(@Body() user: User): Promise<void> {
    const useCase = new UserRegister(this.repo, this.crypt);
    await useCase.execute(user);
  }
}
