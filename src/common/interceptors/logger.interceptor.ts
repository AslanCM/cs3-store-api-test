import { Reflector } from "@nestjs/core";
import { TContextType } from "../middleware/context.middleware";
import { AsyncLocalStorage } from "node:async_hooks";
import { AppLoggerService } from "../services/app-logger.service";
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { SKIP_LOGGER_KEY } from "../decorators/skip-logger.decorators";
import { Request, Response } from "express";

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(
    private readonly logger: AppLoggerService,
    private readonly als: AsyncLocalStorage<TContextType>,
    private readonly reflector: Reflector,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const skip = this.reflector.getAllAndOverride<boolean>(SKIP_LOGGER_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (skip) {
      return next.handle();
    }

    const now = Date.now();
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const { method, url, headers, body, query, params } = request;
    const ip = headers['x-forwarded-for'] || request.ip;

    this.logger.log(
      {
        message: `${method} to ${url}`,
        hostname: headers.host,
        ip,
        method,
        path: url,
        requestHeaders: {
          ...headers,
          authorization: '***',
          'customer-key': '***',
        },
        requestBody: body,
        query,
        params,
      },
      LoggerInterceptor.name,
    );

    return next.handle().pipe(
      tap((data) => {
        const duration = Date.now() - now;
        const statusCode = response.statusCode;
        const requestInfo = this.als.getStore()?.requestInfo;

        this.logger[duration > 500 ? 'warn' : 'log'](
          {
            message: `${method} to ${url} - ${statusCode} - ${duration}ms`,
            responseStatus: statusCode,
            responseBody: data,
            userType: requestInfo?.userType,
          },
          LoggerInterceptor.name,
        );
      }),
    );
  }
}
