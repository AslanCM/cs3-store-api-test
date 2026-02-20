import * as bcrypt from 'bcryptjs';

import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { config } from 'src/config';
import { LoginDto } from './dto/login.dto';
import { BadRequestException, Inject } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm/repository/Repository.js';
import type { StringValue } from 'ms';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(config.KEY)
    private readonly configService: ReturnType<typeof config>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async passwordHash(password: string): Promise<string> {
    const pepper = this.configService.security.pepper;
    const saltRounds = 10;
    const passwordWithPepper = password + pepper;

    const hashedPassword = await bcrypt.hash(passwordWithPepper, saltRounds);

    return hashedPassword;
  }

  private async passwordCompare(password: string, hashedPassword: string): Promise<boolean> {
    const pepper = this.configService.security.pepper;
    const passwordWithPepper = password + pepper;

    return await bcrypt.compare(passwordWithPepper, hashedPassword);
  }


  async login (loginDto: LoginDto) {
    const user = await this.userRepository.findOne({ where: { email: loginDto.email } });

    if (!user) {
      throw new BadRequestException('Credenciales inválidas');
    }

    const isSamePass = await this.passwordCompare(loginDto.password, user.password);

    if (!isSamePass) {
      throw new BadRequestException('Credenciales inválidas');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign<typeof payload>(payload,{
        secret: this.configService.jwt.secret,
        expiresIn: ((this.configService.jwt.expiresIn ?? '1h') as StringValue) ,
      }),
      refreshToken: this.jwtService.sign<typeof payload>(payload, {
        secret: this.configService.jwt.refreshSecret,
        expiresIn: ((this.configService.jwt.refreshExpiresIn ?? '7d') as StringValue),
      }),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }
}
