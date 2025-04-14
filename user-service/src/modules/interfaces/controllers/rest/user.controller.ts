import { Controller, Get } from '@nestjs/common';
import { UserService } from '../../../application/user.service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../../application/commands/create-user.command';

@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly commandBus: CommandBus
  ) {}

  @Get('/create')
  createUser(): string {
    const mockData = {
      name: "Tran Tran Tran2",
      email: "trantran@gmail.com",
      password: "123123"
    }
    const command = new CreateUserCommand(mockData.name, mockData.email, mockData.password);
    const result = this.commandBus.execute(command);
    return this.userService.getHello();
  }
}
