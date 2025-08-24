import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { AuthLoginService } from "../auth-login.service";
import { CreateAuthLoginDto } from "../dto/create-auth-login.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "local") {
    constructor(
        private authService: AuthLoginService,
    ) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }

    validate(email: string, password: string) {
        const user =  this.authService.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException('Email or password incorrect');
        }
        return user;
    }
    
}