import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class UserService {

  private static readonly newProperty = 'USER_PACKAGE';

  constructor(@Inject(UserService.newProperty) private client: ClientGrpc) {}
  private userService;

  onModuleInit() {
    this.userService = this.client.getService('UserService');
  }

  createUser(createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  getAllUsers() {
    return this.userService.getAllUsers({});
  }

  getUser(id: number) {
    return this.userService.getUser({ id });
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    return this.userService.updateUser({ id, user: updateUserDto });
  }

  deleteUser(id: number) {
    return this.userService.deleteUser({ id });
  }
}
