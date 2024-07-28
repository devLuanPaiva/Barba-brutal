import { Injectable } from '@nestjs/common';
import { Appointment, RepositoryAppointment } from '@barba/core';
import { PrismaService } from 'src/db/prisma.service';

// Esse código implementa os metodos requeridos la no core, no RepositoryAppointment.
@Injectable()
export class AppointmentRepository implements RepositoryAppointment {
  constructor(private readonly prismaService: PrismaService) {}

  // Ele vai implementar um repositório que vai acessar via prisma o banco de dados
  async create(appointment: Appointment): Promise<void> {
    try {
      await this.prismaService.appointment.create({
        data: {
          date: appointment.date,
          emailCustomer: appointment.emailCustomer,
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
        emailCustomer: email,
        date: {
          gte: new Date(),
        },
        // Só vai buscar os agendamentos do presente para o futuro através do email do cliente.
      },
      include: {
        services: true,
        professional: true,
        // Vai incluir os servicios e o profissional
      },
      orderBy: {
        date: 'desc',
        // vai ordenar
      },
    });
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
        date: {
          gte: startDay,
          lte: endDay,
        },
        // Filtra pelo id do profissional e por uma data que seja maior que o inicio do dia e menor que o final do dia.
      },
      include: { services: true },
    });
    return result;
  }
}
