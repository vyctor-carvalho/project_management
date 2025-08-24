import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, StrategyOptionsWithRequest } from "passport-jwt"
import { UsersService } from "src/users/users.service";
import { Request } from "express";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(
        private readonly configService: ConfigService,
        private readonly usersService: UsersService
    ) {
        const options: StrategyOptionsWithRequest = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('REFRESH_SECRET')!,
            passReqToCallback: true,
        };

        super(options);
    }

    async validate(req: Request, payload: any) {
        const authHeader = req.get('Authorization');
        if (!authHeader) {
            return new UnauthorizedException('Invalid refresh token');;
        }
        const refresh_token = authHeader.replace('Bearer', '').trim();
        const user = await this.usersService.getUserIfRefreshTokenMatches(refresh_token, payload.sub);
        if (!user) {
            return new UnauthorizedException('Invalid refresh token');;
        }
        return user;
    
    }

}