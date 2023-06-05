import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create-dto';
import { UserLoginDto } from './dto/user-login-dto';
import { UserUpdateDto } from './dto/user-update-dto';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/signup')
  async create(@Body() userCreateDto: UserCreateDto): Promise<any> {
    const { password, phoneNumber, username } = userCreateDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userService.createUser(
      username,
      hashedPassword,
      phoneNumber,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/info/:userId')
  async getUserInfo(@Param('userId') userId: string) {
    return await this.userService.getUserById(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/all')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/update/:userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() userUpdateDto: UserUpdateDto,
  ) {
    if (userUpdateDto.password) {
      const hashedpassword = await bcrypt.hash(userUpdateDto.password, 10);
      userUpdateDto.password = hashedpassword;
    }
    return await this.userService.updateUser(userId, userUpdateDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete/:userId')
  async deleteUser(@Param('userId') userId: string) {
    return await this.userService.deleteUserById(userId);
  }
}
