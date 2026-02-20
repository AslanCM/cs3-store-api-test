import { OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository.js';
import { User } from '../v1/user/entities/user.entity';
import { AppLoggerService } from 'src/common/services/app-logger.service';
import { AuthService } from '../v1/auth/auth.service';
import { ERole } from 'src/common/enums/role.enum';

export class SeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly logger: AppLoggerService,
    private readonly authService: AuthService,
  ) {}

  async onApplicationBootstrap() {
    const adminEmail = 'admin@test.com';
    const rawPassword = 'password123';

    const existingAdmin = await this.userRepository.findOne({ where: { email: adminEmail } });

    if (Boolean(existingAdmin) === false) {
      const hashedPassword = await this.authService.passwordHash(rawPassword);
      const newAdmin = this.userRepository.create({
        email: adminEmail,
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'User',
        role: ERole.ADMIN,
        isActive: true,
      });

      await this.userRepository.save(newAdmin);
      this.logger.log(`Admin user with email ${adminEmail} created successfully.`, 'SeedService');
    } else {
      this.logger.log(`Admin user with email ${adminEmail} already exists. Skipping seeding.`, 'SeedService');
    }
  }
}
