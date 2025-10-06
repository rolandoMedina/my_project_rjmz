import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async validateUser(user: LoginDto) {
    const foundUser = await this.prismaService.user.findUnique({
      where: { email: user.email },
    })

    if (!foundUser) throw new NotFoundException('Usuario no existe.');

    const isPasswordValid = user.password === foundUser.password;

    if(isPasswordValid){
      return this.jwtService.sign({
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
      });
    } else {
      throw new UnauthorizedException('Credenciales incorrectas.');
    }
  }
}
