import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDTO } from './dtos/create-user.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup({ email, password }: CreateUserDTO) {
    const users = await this.usersService.find(email);
    if (users.length > 0) throw new BadRequestException('Email in use');
    const salt = randomBytes(8).toString('hex'); // here salt will be 16 characters long
    const hash = (await scrypt(password, salt, 32)) as Buffer; //this 32 is how long we want our hash to be

    const result = salt + '.' + hash.toString('hex');
    return this.usersService.create({ email, password: result });
  }

  async signIn({ email, password }: CreateUserDTO) {
    const [user] = await this.usersService.find(email);
    if (!user) throw new NotFoundException('User Not Found');
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (hash.toString('hex') !== storedHash)
      throw new BadRequestException('Invalid credentials');

    return user;
  }
}
