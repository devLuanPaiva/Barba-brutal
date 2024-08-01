import { Injectable } from '@nestjs/common';
import { Appointment, RepositoryAppointment } from '@barba/core';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class AppointmentRepository implements RepositoryAppointment {
  constructor(private readonly prismaService: PrismaService) {}
  async create(appointment: Appointment): Promise<void> {
    try {
      await this.prismaService.appointment.create({
        data: {
          date: appointment.date,
          user: { connect: { id: appointment.user.id } },
          professional: { connect: { id: appointment.professional.id } },
          services: {
            connect: appointment.services.map((service) => ({
              id: service.id,
            })),
          },
        },
      });
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error; // Re-lança o erro para ser capturado pelo controlador
    }
  }
  async searchEmail(email: string): Promise<Appointment[]> {
    return this.prismaService.appointment.findMany({
      where: {
        user: {
          email: email,
        },
        date: {
          gte: new Date(),
        },
      },
      include: {
        services: true,
        professional: true,
        user: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }
  async searchProfessionalAndDate(
    professional: number,
    date: Date,
  ): Promise<Appointment[]> {
    const year = date.getFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();

    const startDay = new Date(year, month, day, 0, 0, 0);
    const endDay = new Date(year, month, day, 23, 59, 59);

    const result: any = await this.prismaService.appointment.findMany({
      where: {
        professionalId: professional,
        date: {
          gte: startDay,
          lte: endDay,
        },
      },
      include: { services: true, user: true },
    });
    return result;
  }
}
