import { ApiProperty } from '@nestjs/swagger';
import { User as UserModel } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class User implements UserModel {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  id: number;
  @ApiProperty()
  username: string;
  @Exclude()
  password: string;
}
