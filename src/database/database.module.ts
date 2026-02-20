import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [config.KEY],
      useFactory: (ConfigService: ConfigType<typeof config>) => {
        return {
          type: 'postgres',
          host: ConfigService.db.host,
          port: ConfigService.db.port,
          username: ConfigService.db.username,
          password: ConfigService.db.password,
          database: ConfigService.db.name,
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          autoLoadEntities: true,
          synchronize: ConfigService.nodeEnv !== 'production',
        };
      },
    }),
    ConfigModule,
  ],
})
export class DatabaseModule {}
