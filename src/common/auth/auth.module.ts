import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from 'nestjs-config';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';
import { UserModule } from '../../feature/user/user.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        secret: config.get('auth.JWT_SECRET'),
        signOptions: {
          expiresIn: config.get('auth.JWT_EXPIRESIN'),
        },
      }),
      inject: [ConfigService],
    }),
    forwardRef(() => UserModule),
  ],
  providers: [AuthService, AuthStrategy],
  exports: [AuthService, PassportModule],
})
export class AuthModule {}
