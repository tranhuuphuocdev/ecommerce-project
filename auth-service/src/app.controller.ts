import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy
  ) {}

  @Get()
  getHello(): string {
    let sendMessage = this.userClient.emit({ cmd: 'create_user' }, {}).toPromise();
    return this.appService.getHello();
  }
}
