import { PrismaClient } from '@prisma/client';
import {
  Professional as PrismaProfessional,
  Service as PrismaService,
} from 'prisma/prisma-client';
import { professional, services } from '@barba/core';

const prisma = new PrismaClient();

async function seed() {
  await prisma.professional.createMany({
    data: professional as PrismaProfessional[],
  });
  await prisma.service.createMany({ data: services as PrismaService[] });
}

seed();
