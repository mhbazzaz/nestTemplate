import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-paylod-dto';
import * as jwksClient from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      algorithms: ['RS256'],
      secretOrKeyProvider: (req, jwtToken, done) => {
        const client = jwksClient({
          jwksUri: 'https://<your-auth0-domain>.auth0.com/.well-known/jwks.json',
        });
        client.getSigningKey(jwtToken.header.kid, (err, key) => {
          if (err) {
            return done(err);
          }
          const signingKey = key.getPublicKey();
          done(null, signingKey);
        });
      },
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.getUserByUsername(payload.username);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }
}

function jwksClient(arg0: { jwksUri: string; }) {
    throw new Error('Function not implemented.');
}
