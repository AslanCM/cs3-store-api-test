import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { config } from 'src/config';
import { JwtPayload } from '../interfaces/payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(config.KEY)
    private readonly configService: ReturnType<typeof config>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwt.secret ?? 'One_Secret_Key_To_Rule_Them_All',
    });
  }

  validate(payload: JwtPayload) {
    if (!payload?.sub) {
      throw new UnauthorizedException('Token inválido o corrupto');
    }

    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
