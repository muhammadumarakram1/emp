import { User } from './entities/user.entity';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const {
      email,
      name,
      password,
      experience,
      education,
      salary,
      allocated_leave,
      remaining_leaves,
    } = createUserDto;
    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        password,
        experience: +experience,
        education,
        salary: +salary,
        allocated_leave: +allocated_leave,
        remaining_leaves: +remaining_leaves,
      },
    });
    await this.prisma.leave_Management.create({
      data: {
        employeeId: user.id,
      },
    });
    return user;
  }

  async findAll(): Promise<User[]> {
    const allUsers = await this.prisma.user.findMany();
    return allUsers;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const { name, education, experience } = updateUserDto;
    const updateUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        education,
        experience: +experience,
      },
    });
    return updateUser;
  }

  async remove(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
