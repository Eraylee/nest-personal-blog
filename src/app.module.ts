/*
 * @Author: ERAYLEE
 * @Date: 2019-09-06 21:06:33
 * @LastEditors: ERAYLEE
 * @LastEditTime: 2019-12-26 15:46:43
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { FeatureModule } from './feature/feature.module';
import { AuthModule } from './common/auth/auth.module';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import * as path from 'path';

@Module({
  imports: [
    FeatureModule,
    AuthModule,
    ConfigModule.load(path.resolve(__dirname, 'config/**/!(*.d).{ts,js}'), {
      modifyConfigName: name => name.replace('.config', ''),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
