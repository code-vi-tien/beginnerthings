import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "src/application/services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor (private readonly authService: AuthService) {};

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const request = context.switchToHttp().getRequest();

            const token = request.headers.authorization.split(' ')[1];
            if (!token) {
                throw new UnauthorizedException();
            };    

            return true
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}