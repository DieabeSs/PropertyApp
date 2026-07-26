import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}

  async register(registerDto: RegisterDto) {

    const email = registerDto.email.toLowerCase().trim();

    const existingUser = await this.prisma.user.findUnique({
        where: { email },
      });
    if (existingUser) {
        throw new ConflictException('Email already in use');
    }

    const passwordHash = await bcrypt.hash(registerDto.password, 10);

    const user = await this.prisma.user.create({
        data: {
            email: email,
            passwordHash: passwordHash,
            firstName: registerDto.firstName,
            lastName: registerDto.lastName,
        },
    });
    const { passwordHash: _, ...safeUser } = user;

    return safeUser;
  }

  async login(loginDto: LoginDto) {
    const email = loginDto.email.toLowerCase().trim();

    const user = await this.prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.passwordHash);

    if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    const { passwordHash: _, ...safeUser } = user;

    return { accessToken: token, user: safeUser };
  }
}