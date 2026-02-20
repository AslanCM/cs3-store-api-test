import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { Public } from "src/common/decorators/public.decorator";

@ApiTags('auth')
@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Autenticar usuario y obtener tokens' })
  @ApiResponse({ status: 200, description: 'Login exitoso, devuelve JWT.' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
  @Public()
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
