import { TContextType } from '../middleware/context.middleware';
import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common/services/logger.service';
import { AsyncLocalStorage } from 'node:async_hooks';

@Injectable()
export class AppLoggerService extends Logger {
  constructor(private readonly als: AsyncLocalStorage<TContextType>) {
    super();
  }

  error(...args: Parameters<typeof Logger.error>) {
    args[0] = this.getMessage(args[0]);
    super.error(...args);
  }

  log(...args: Parameters<typeof Logger.log>) {
    args[0] = this.getMessage(args[0]);
    super.log(...args);
  }

  warn(...args: Parameters<typeof Logger.warn>) {
    args[0] = this.getMessage(args[0]);
    super.warn(...args);
  }

  debug(...args: Parameters<typeof Logger.debug>) {
    args[0] = this.getMessage(args[0]);
    super.debug(...args);
  }

  verbose(...args: Parameters<typeof Logger.verbose>) {
    args[0] = this.getMessage(args[0]);
    super.verbose(...args);
  }

  fatal(...args: Parameters<typeof Logger.fatal>) {
    args[0] = this.getMessage(args[0]);
    super.fatal(...args);
  }

  private getMessage(message: unknown) {
    if (typeof message !== 'object') {
      message = {
        message,
      };
    }

    const requestInfo = this.als.getStore()?.requestInfo;
    if (!requestInfo) {
      return {
        ...(message as object),
      };
    }

    return {
      ...(message as object),
      UOW: requestInfo.UOW,
      'session-tracker': requestInfo['session-tracker'],
      user: requestInfo.user,
      userType: requestInfo.userType,
    };
  }
}
