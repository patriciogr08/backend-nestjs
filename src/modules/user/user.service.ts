import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;

    return this.usersRepository.save(user)
  }

  findAll() {
    return this.usersRepository.find({ where: { deletedAt: null }});
  }

  findOne(id: number) {
    const userFound = this.usersRepository.findOne({ where: { id,deletedAt: null }} );
    if (!userFound) throw new NotFoundException('Este usuario no existe');

    return userFound;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const userFound = this.usersRepository.findOne({ where: { id,deletedAt: null }} );

    if (!userFound) throw new NotFoundException('Este usuario no existe');
    const updatedUser = Object.assign(userFound, updateUserDto);

    return this.usersRepository.save(updatedUser);
  }

  async remove(id: number) {
    const user = this.usersRepository.findOne({ where: { id,deletedAt: null }} );
    if (!user) throw new NotFoundException('Este usuario no existe');
    await this.usersRepository.update(id,{ deletedAt: new Date()});
  }
}
