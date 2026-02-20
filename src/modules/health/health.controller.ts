import { Get, HttpCode, HttpStatus } from "@nestjs/common";
import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "src/common/decorators/public.decorator";
import { SkipLogger } from "src/common/decorators/skip-logger.decorators";

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  @Public()
  @SkipLogger()
  @HttpCode(HttpStatus.OK)
  healthCheck() {
    return {
      status: 'up',
      timestamp: new Date().toISOString(),
    };
  }
}
