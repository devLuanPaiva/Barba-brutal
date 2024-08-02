import { PrismaClient } from '@prisma/client';
import {
  Professional as PrismaProfessional,
  Service as PrismaService,
} from 'prisma/prisma-client';
import { professional, services, User } from '@barba/core';

const prisma = new PrismaClient();

async function seed() {
  await prisma.appointment.deleteMany();
  await prisma.user.deleteMany();
  await prisma.professional.deleteMany();
  await prisma.service.deleteMany();

  await prisma.professional.createMany({
    data: professional as PrismaProfessional[],
  });
  await prisma.service.createMany({ data: services as PrismaService[] });

  const users: Partial<User>[] = [
    {
      name: 'Marcão Machadada',
      email: 'marcao@barbabrutal.app',
      password: 'Senha123#',
      phone: '11999999999',
      barber: true,
    },
    {
      name: 'Beto Brutal',
      email: 'beto@barbabrutal.app',
      password: 'Senha123#',
      phone: '11999999999',
      barber: true,
    },
    {
      name: 'Kathya Tesourada',
      email: 'kathya@barbabrutal.app',
      password: 'Senha123#',
      phone: '11999999999',
      barber: true,
    },
    {
      name: 'Sérgio Serrador',
      email: 'sergio@barbabrutal.app',
      password: 'Senha123#',
      phone: '11999999999',
      barber: true,
    },
    {
      name: 'Rafa Raspa Tudo',
      email: 'rafa@barbabrutal.app',
      password: 'Senha123#',
      phone: '11999999999',
      barber: true,
    },
    {
      name: 'Fernanda Faísca',
      email: 'fernanda@barbabrutal.app',
      password: 'Senha123#',
      phone: '11999999999',
      barber: true,
    },
  ];
  await prisma.user.createMany({ data: users as any });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
