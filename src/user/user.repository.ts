import { FilterQuery, Model } from 'mongoose';
import { UserRepositoryInterface } from './interface/user-repository.interface';
import { UserDocument, User } from './schema/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return await this.userModel.findById(id).exec();
  }

  async findOne(query: FilterQuery<User>): Promise<UserDocument | null> {
    return await this.userModel.findOne(query).exec();
  }

  async findAll(): Promise<UserDocument[]> {
    return await this.userModel.find().exec();
  }

  async create(data: Partial<User>): Promise<UserDocument> {
    const createdUser = new this.userModel(data);
    return await createdUser.save();
  }

  async update(id: string, data: Partial<User>): Promise<UserDocument | null> {
    return await this.userModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }

  async deleteById(id: string): Promise<UserDocument | null> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}
