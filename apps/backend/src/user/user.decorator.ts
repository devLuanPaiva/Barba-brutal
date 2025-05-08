import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserLogged = createParamDecorator(
  (_date: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
