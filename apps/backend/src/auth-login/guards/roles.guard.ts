import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLE_KEY } from "../decorators/roles.decorator";


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // Pega os papéis necessários que definimos com @Roles(...) na rota
        const requireRoles = this.reflector.getAllAndOverride<string[]>(ROLE_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        // Se nenhuma role é necessária, permite o acesso
        if (!requireRoles) {
            return true;
        }

        // Pega o usuário que foi anexado na requisição pelo AuthGuard('jwt')
        const { user } = context.switchToHttp().getRequest();

        // Verifica se a role do usuário está na lista de papéis permitidos
        return requireRoles.some((role) => user.role?.includes(role));
    }
}