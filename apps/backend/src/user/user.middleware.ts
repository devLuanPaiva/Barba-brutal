import { RepositoryUser, User } from '@barba/core';
import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserMidddleware implements NestMiddleware {
  constructor(private readonly repo: RepositoryUser) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.replace('Bearer', '');
    if (!token) {
      throw new HttpException('Token não informado', 401);
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET) as User;
    const user = await this.repo.searchEmail(payload.email);

    if (!user) {
      throw new HttpException('Usuário não encontrado', 401);
    }
    (req as any).user = user;
    next();
  }
}
