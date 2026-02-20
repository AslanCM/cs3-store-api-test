import { Module } from "@nestjs/common";
import { SeedService } from "./seed.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../v1/user/entities/user.entity";
import { AuthModule } from "../v1/auth/auth.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    AuthModule,
  ],
  providers: [SeedService],
})
export class SeedModule {}
