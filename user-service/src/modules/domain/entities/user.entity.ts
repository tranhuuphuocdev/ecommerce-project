export interface UserProps {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
}
  
export class UserEntity {
    private readonly _id: string;
    private _name: string;
    private _email: string;
    private _password: string;
    private readonly _createdAt: Date;
  
    constructor(props: UserProps) {
      this._id = props.id;
      this._name = props.name;
      this._email = props.email;
      this._password = props.password;
      this._createdAt = props.createdAt ?? new Date();
    }
  
    // ✅ Getter
    get id(): string {
      return this._id;
    }
  
    get name(): string {
      return this._name;
    }
  
    get email(): string {
      return this._email;
    }
  
    get password(): string {
      return this._password;
    }
  
    get createdAt(): Date {
      return this._createdAt;
    }
  
    // ✅ Business logic methods
    changeName(newName: string): void {
      this._name = newName;
    }
  
    changePassword(newPassword: string): void {
      this._password = newPassword;
    }
  
    // (nếu muốn): validateEmail, enableTwoFA, deactivate, v.v...
}
  