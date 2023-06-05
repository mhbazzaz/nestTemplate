import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create-dto';
import { UserLoginDto } from './dto/user-login-dto';
import { UserUpdateDto } from './dto/user-update-dto';
import * as bcrypt from 'bcrypt';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

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

  @Get('/info/:userId')
  async getUserInfo(@Param('userId') userId: string) {
    return await this.userService.getUserById(userId);
  }

  @Get('/all')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

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

  @Delete('/delete/:userId')
  async deleteUser(@Param('userId') userId: string) {
    return await this.userService.deleteUserById(userId);
  }
}
