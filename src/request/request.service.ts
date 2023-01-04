import { Request } from './entities/request.entity';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@Injectable()
export class RequestService {
  constructor(private prisma: PrismaService) {}
  async create(createRequestDto: CreateRequestDto): Promise<Request> {
    const { reason, date_requested, days, employee_Id } = createRequestDto;
    const request = await this.prisma.request_Leave.create({
      data: {
        reason,
        date_requested: new Date(date_requested),
        employee_Id,
        days: +days,
      },
    });
    return request;
  }

  async findAll(): Promise<Request[]> {
    const allRequest = await this.prisma.request_Leave.findMany();
    return allRequest;
  }

  async findOne(id: string): Promise<Request> {
    const request = await this.prisma.request_Leave.findUnique({
      where: {
        id,
      },
    });
    return request;
  }

  async update(
    id: string,
    updateRequestDto: UpdateRequestDto,
  ): Promise<Request> {
    const { response } = updateRequestDto;
    const updateResponse = await this.prisma.request_Leave.update({
      where: {
        id,
      },
      data: {
        response,
      },
    });
    return updateResponse;
  }

  async remove(id: string): Promise<void> {
    await this.prisma.request_Leave.delete({
      where: { id },
    });
  }
}
