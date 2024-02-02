import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
@ApiTags('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiBearerAuth()
  @Post()
  @ApiOkResponse({ type: User })
  async create(@Body() createUserDto: CreateUserDto) {
    return new User(await this.userService.create(createUserDto));
  }

  @ApiBearerAuth()
  @Get()
  @ApiOkResponse({ type: User, isArray: true })
  async findAll() {
    const users = await this.userService.findAll();
    return users.map((u) => new User(u));
  }

  @ApiBearerAuth()
  @Get(':id')
  @ApiOkResponse({ type: User })
  async findOne(@Param('id') id: number) {
    return new User(await this.userService.findOne(id));
  }

  @ApiBearerAuth()
  @Patch(':id')
  @ApiOkResponse({ type: User })
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return new User(await this.userService.update(id, updateUserDto));
  }

  @ApiBearerAuth()
  @Delete(':id')
  @ApiOkResponse({ type: User })
  async remove(@Param('id') id: number) {
    return new User(await this.userService.remove(id));
  }
}
