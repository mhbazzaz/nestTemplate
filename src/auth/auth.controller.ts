import { Controller, Post, Body, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserLoginDto } from "src/user/dto/user-login-dto";
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('/login')
  async login(@Body() userLoginDto: UserLoginDto): Promise<{ access_token: string }> {
    const { username , password } = userLoginDto ;
    const user = await this.authService.validateUser(userLoginDto.username, userLoginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }
}