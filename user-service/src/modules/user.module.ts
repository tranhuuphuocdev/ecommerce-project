import { Module } from '@nestjs/common';
import { UserController } from './interfaces/controllers/rest/user.controller';
import { UserService } from './application/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserHandler } from './application/handlers/create-user.handler';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { UserDocument, UserSchema } from './infrastructure/schemas/user.schema';
import { UserMessageController } from './interfaces/controllers/messaging/user.message-handler';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/twokstore'),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema }
    ])
  ],
  controllers: [UserController, UserMessageController],
  providers: [
    UserRepository,
    CreateUserHandler,
    UserService
  ],
})
export class UserModule {}
