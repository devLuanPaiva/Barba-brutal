import { PrismaClient } from '@prisma/client';
import {
  Professional as PrismaProfessional,
  Service as PrismaService,
} from 'prisma/prisma-client';
import { professional, services, User } from '@barba/core';

const prisma = new PrismaClient();

async function seed() {
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
  ];
  await prisma.user.createMany({ data: users as any });
}

seed();
