import { UserEntity } from '../entities/user.entity';

export abstract class IUserRepository {
  getByEmail: (email: string) => Promise<UserEntity | null>;
  getById: (id: string) => Promise<UserEntity | null>;
  save: (user: UserEntity) => Promise<UserEntity>;
}
