import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserCommand } from 'src/modules/application/commands/create-user.command';

@Controller()
export class UserMessageController {
    constructor(private readonly commandBus: CommandBus){};
  @MessagePattern({ cmd: 'create_user' })
  async handleCreateUser(data: any) {
    console.log('Đang tạo user:', data);
    const mockData = {
        name: "Tran Tran Tran2",
        email: "trantran2@gmail.com",
        password: "123123"
    }
    const command = new CreateUserCommand(mockData.name, mockData.email, mockData.password);
    const result = this.commandBus.execute(command);
    return { message: 'User created successfully' };
  }
}