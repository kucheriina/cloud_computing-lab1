import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { genSaltSync } from 'bcryptjs';
import { AuthDto, RegisterDto } from 'src/auth/auth.dto';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'typeorm/util/StringUtils';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);

    return {
      user,
      accessToken: await this.issueAccessToken(user.id),
    };
  }

  async register(dto: RegisterDto) {
    const oldUserByEmail = await this.userRepository.findOneBy({
      email: dto.email,
    });

    if (oldUserByEmail) throw new BadRequestException('Пользователь с таким Email уже существует');

    const salt = genSaltSync(10);

    const newUser = await this.userRepository.create({
      email: dto.email,
      password: hash(dto.password, salt),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const user = await this.userRepository.save(newUser);

    return {
      user,
      accessToken: await this.issueAccessToken(user.id),
    };
  }

  async validateUser(dto: AuthDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
      select: ['id', 'email', 'createdAt', 'updatedAt', 'password'],
    });

    if (!user) throw new NotFoundException('Email или пароль неверные');

    const isValidPassword = await this.compare(dto.password, user.password);

    if (!isValidPassword) throw new NotFoundException('Email или пароль неверные');

    return user;
  }

  async compare(password: string, userPassword: string) {
    const salt = genSaltSync(10);

    return hash(password, salt) === userPassword;
  }

  async issueAccessToken(userId: number) {
    const data = {
      id: userId,
    };

    return await this.jwtService.signAsync(data, {
      expiresIn: '31d',
    });
  }

  returnUserFields(user: UserEntity) {
    return {
      id: user.id,
      email: user.email,
    };
  }
}
