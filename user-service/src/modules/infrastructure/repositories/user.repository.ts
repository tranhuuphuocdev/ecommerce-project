import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../schemas/user.schema';
import { UserEntity } from '../../domain/entities/user.entity';
import { IUserRepository } from "../../domain/repositories/user.repository";

export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async save(user: UserEntity): Promise<UserEntity> {
    return await this.userModel.findByIdAndUpdate(
      user.id,
      {
        name: user.name,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt || new Date()
      },
      { upsert: true, new: true },
    );
  }

  async getById(id: string): Promise<UserEntity | null> {
    const doc = await this.userModel.findById(id).exec();
    if (!doc) return null;

    return new UserEntity({
      id: doc.id.toString(),
      name: doc.name,
      email: doc.email,
      password: doc.password,
      createdAt: doc.createdAt,
    });
  }

  async getByEmail(email: string): Promise<UserEntity | null> {
    const doc = await this.userModel.findOne({ email }).exec();
    if (!doc) return null;

    return new UserEntity({
      id: doc.id.toString(),
      name: doc.name,
      email: doc.email,
      password: doc.password,
      createdAt: doc.createdAt,
    });
  }
}