import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {

  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.project.create({
      data,
    });
  }

  findAll() {
    return this.prisma.project.findMany();
  }

  findOne(id: number) {
    return this.prisma.project.findUnique({
      where: { id },
    });
  }
  update(id: number, data: any) {
    return this.prisma.project.update({
      where: { id },
      data,
    });
  }

  patch(id: number, data: any) {
    return this.prisma.project.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.project.delete({
      where: { id },
    });
  }
}