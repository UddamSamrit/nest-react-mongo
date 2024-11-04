import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ username, password: hashedPassword });
    await newUser.save();
    return this.generateToken(newUser);
  }

  private getJwtToken(userId: string, secret: string, expiresIn: string) {
    return this.jwtService.sign({ userId }, { secret, expiresIn });
  }

  async refresh(refresh_token: string) {
    const payload = this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_SECRET,
    });
    const newAccessToken = this.getJwtToken(
      payload.userId,
      process.env.JWT_SECRET,
      process.env.JWT_EXPIRATION_TIME,
    );

    return {
      newAccessToken,
    };
  }

  async login(username: string, password: string) {
    const user = await this.userModel.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const accessToken = this.getJwtToken(
      user._id.toString(),
      process.env.JWT_SECRET,
      process.env.JWT_EXPIRATION_TIME,
    );
    const refreshToken = this.getJwtToken(
      user._id.toString(),
      process.env.REFRESH_SECRET,
      process.env.REFRESH_EXPIRATION_TIME,
    );

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  private generateToken(user: User) {
    const payload = { username: user.username, sub: user.id };
    return { access_token: this.jwtService.sign(payload), user };
  }
}
