import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async (jwtService: JwtService) => {
        return {
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          playground: false,
          plugins: [ApolloServerPluginLandingPageLocalDefault()],
          subscriptions: {
            'graphql-ws': {
              onConnect: async (context) => {
                const { connectionParams } = context;
                const authHeader = connectionParams?.Authorization;
                console.log('THE AUTH HEADER IS ', authHeader);
                if (
                  typeof authHeader !== 'string' ||
                  !authHeader.startsWith('Bearer ')
                ) {
                  throw new Error('Invalid authorization header format!');
                }
                const token = authHeader.split(' ')[1];
                if (!token) {
                  throw new Error('Missing auth token!');
                }
                try {
                  const payload = await jwtService.verifyAsync(token, {
                    secret: 'JWT_SECRET',
                  });
                  (context.extra as Record<string, any>).user = payload; // this gets attached as an extra object in context.extra = {user:payload}

                  return true;
                } catch (err) {
                  throw new Error('Invalid or expired token!');
                }
              },
            },
          },
          context: ({ req, extra }) => {
            if (extra) {
              return {
                req,
                user: extra.user,
              };
            } else {
              return {
                req,
              };
            }
          },
        };
      },
      inject: [JwtService],
      imports: [JwtModule],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI'),
      }),
      inject: [ConfigService],
    }),

    UserModule,
    TodoModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
