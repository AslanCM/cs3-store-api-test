import { Global, Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AsyncLocalStorage } from "node:async_hooks";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { AppLoggerService } from "./services/app-logger.service";

@Global()
@Module({
  providers: [
    {
      provide: AsyncLocalStorage,
      useValue: new AsyncLocalStorage(),
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AppLoggerService,
  ],
  exports: [
    AppLoggerService,
    AsyncLocalStorage,
  ],
})
export class CommonModule {}
