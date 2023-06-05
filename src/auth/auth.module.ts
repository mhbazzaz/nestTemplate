import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [
      JwtModule.register({
        publicKey: '-----BEGIN PUBLIC KEY-----\n' +
                   'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqT7Hj7aR/W6vnBkH0zZz\n' +
                   'LlN0wS+Jv+KBjiQk1d5Xz9h6bcIu4Wz5rEVE8mGjGFnL8pFJ3tE3/9QZ7R7Pr5On\n' +
                   'UCsLflGqSpVJWtJjQn8dK/Jy+QqZrhGPgRfT4zFQ6bW8H+V9lIMoy8J+ltB7tFJQ\n' +
                   '4d/3u3e4gZWlCAV53BwZk/4fdoSvH0h6aQfH6jTsj5Hd6Z2y0Z3/9zjgVcdJcFRf\n' +
                   'e4Y6IjSdPbVU8vQ0JvUQlMypdXJpJLJzjQz9v3r5eA7z5gPn8TmL5oXuF8WsKt7h\n' +
                   'gGqPmL1zHgEJ6g6Dj1F5Q4J5F5j5VEwLcQqSxgKfNhn9wFyQn0Lg3fOzNQ7JrN3K\n' +
                   'iQIDAQAB\n' +
                   '-----END PUBLIC KEY-----\n',
        signOptions: {
          algorithm: 'RS256',
          expiresIn: '1h',
        },
      }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
  })
  export class AuthModule {}