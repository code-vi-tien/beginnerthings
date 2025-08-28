import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "src/presentation/middleware/auth.guard";
import { UserModule } from "./user.module";
import { AuthService } from "src/application/services/auth.service";

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            secret: process.env.JWT_KEY,
            signOptions: { expiresIn: '60m' },
        }),
    ],
    providers: [
        AuthService, //Haven't create yet
        AuthGuard
    ],
    exports: [
        AuthService,
        AuthGuard,
        JwtModule,
    ],
})
export class AuthModuel {}