import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getAllUser(): Promise<User[]> {
    return await this.userModel.find();
  }

  async createUser(
    username: string,
    hashedPassword: string,
    phoneNumber: string,
  ): Promise<User | Error> {
    if (await this.userModel.exists({ username })) {
      throw new HttpException('This Username Exists!', HttpStatus.CONFLICT);
    }
    try {
      return await this.userModel.create({
        username,
        password: hashedPassword,
        phoneNumber,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserByUsername(username: string): Promise<User> {
    return await this.userModel.findOne({ username });
  }

  async getUserById(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async getAllUsers() {
    return await this.userModel.find({}, '_id username email');
  }

  async updateUser(userId, body) {
    return await this.userModel.findByIdAndUpdate(userId, {
      $set: {
        username: body.username,
        password: body.password !== null && body.password,
        phoneNumber: body.phoneNumber !== null && body.phoneNumber,
      },
    });
  }

  async deleteUserById(userId) {
    return await this.userModel.findByIdAndDelete(userId);
  }
}
