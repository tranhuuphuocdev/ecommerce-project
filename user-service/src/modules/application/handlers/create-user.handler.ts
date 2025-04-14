import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(private readonly userRepo: UserRepository) {}

    async execute(command: CreateUserCommand): Promise<void> {
        const user = new UserEntity({
            id: uuidv4(),
            name: command.name,
            email: command.email,
            password: command.password,
        });

        await this.userRepo.save(user);
    }
}
