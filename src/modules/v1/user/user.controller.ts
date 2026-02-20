import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AddUserDto } from './dto/add-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  async register(@Body() createUserDto: AddUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    const userId = req.user.userId;
    return this.userService.findAuthenticatedUser(userId);
  }
}
