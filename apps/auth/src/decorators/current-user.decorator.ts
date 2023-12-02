import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { AuthUser } from '../services/jwt-strategy.service';

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as AuthUser;
  },
);
