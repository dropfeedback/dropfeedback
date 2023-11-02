import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class GithubGuard extends AuthGuard('github') {
  constructor() {
    super();
  }

  getRequest<T = any>(context: ExecutionContext): T {
    console.log('github get req', context);
    return super.getRequest(context);
  }
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    console.log('github handle req', { err, user, info, context, status });
    return super.handleRequest(err, user, info, context, status);
  }
}
