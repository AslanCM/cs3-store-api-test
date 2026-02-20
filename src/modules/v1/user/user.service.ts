import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddUserDto } from './dto/add-user.dto';
import { User } from './entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { AppLoggerService } from 'src/common/services/app-logger.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly logger: AppLoggerService,
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: AddUserDto) {
    const existUser = await this.userRepository.findOne({ where: { email: createUserDto.email } });

    if (existUser) {
      this.logger.warn(`User with email ${createUserDto.email} already exists.`, 'UserService');
      throw new BadRequestException('Usuario ya existe');
    }

    const hashedPassword = await this.authService.passwordHash(createUserDto.password);
    createUserDto.password = hashedPassword;

    const user = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user);
    const { password, ...userWithoutPassword } = savedUser;

    return userWithoutPassword;
  }

  async findAuthenticatedUser(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      this.logger.warn(`User with ID ${userId} not found.`, 'UserService');
      throw new BadRequestException('Usuario no encontrado');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
