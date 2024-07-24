import { Injectable } from '@nestjs/common';
import {
  Appointment,
  RepositoryAppointment,
} from '@barba/core/src/appointment/';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class AppointmentRepository implements RepositoryAppointment {
  constructor(private readonly prismaService: PrismaService) {}
  async create(appointment: Appointment): Promise<void> {
    await this.prismaService.appointment.create({
      data: {
        data: appointment.data,
        emailCustomer: appointment.emailCoustumer,
        professional: { connect: { id: appointment.professional.id } },
        service: {
          connect: appointment.service.map((service) => ({ id: service.id })),
        },
      },
    });
  }
  async searchEmail(email: string): Promise<Appointment[]> {
    const result: any = await this.prismaService.appointment.findMany({
      where: {
        emailCustomer: email,
        data: {
          gte: new Date(),
        },
      },
      include: {
        service: true,
        professional: true,
      },
      orderBy: {
        data: 'desc',
      },
    });
    return result;
  }
  async searchProfessionalAndData(
    professional: number,
    data: Date,
  ): Promise<Appointment[]> {
    const year = data.getFullYear();
    const month = data.getUTCMonth();
    const day = data.getUTCDate();

    const startDay = new Date(year, month, day, 0, 0, 0);
    const endDay = new Date(year, month, day, 23, 59, 59);

    const result: any = await this.prismaService.appointment.findMany({
      where: {
        professionalId: professional,
        data: {
          gte: startDay,
          lte: endDay,
        },
      },
      include: { service: true },
    });
    return result;
  }
}