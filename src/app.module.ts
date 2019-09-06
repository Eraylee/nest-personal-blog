import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeatureModule } from './feature/feature.module';

@Module({
  imports: [TypeOrmModule.forRoot(), FeatureModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
