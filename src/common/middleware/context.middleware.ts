
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AsyncLocalStorage } from 'node:async_hooks';
import { randomUUID } from 'node:crypto';
import { config } from 'src/config';

type TRequestInfo = {
  UOW: string;
  'session-tracker': string;
  authorization: string;
  user?: number;
  userType?: number;
};

export type TContextType = { requestInfo: TRequestInfo };

@Injectable()
export class ContextMiddleware implements NestMiddleware {
  constructor(
    @Inject(config.KEY)
    private readonly configService: ReturnType<typeof config>,
    private readonly als: AsyncLocalStorage<TContextType>,
  ) {}

  use(request: Request, response: Response, next: NextFunction) {
    const headers = request.headers;

    if (!headers['session-tracker']) {
      headers['session-tracker'] = randomUUID();
    }

    const requestInfo: TRequestInfo = {
      UOW: `${this.configService.app.name}${randomUUID().split('-')[0]}`,
      'session-tracker': headers['session-tracker'] as string,
      authorization: (headers['authorization'] as string) || '',
    };

    this.als.run({ requestInfo }, () => next());
  }
}
