import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { GqlContext } from 'src/common/interface/gql-context.interface';

@Injectable()
export class GqlJwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext): Request {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext<GqlContext>().req;
    console.log('THE REQUEST BODY IS ', req.body.variables);
    return req;
  }

  handleRequest(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ) {
    if (err || !user) {
      throw new UnauthorizedException(
        'You must be logged in to perform this request.',
        'Token not found or the token is invalid',
      );
    }
    return user;
  }
}
