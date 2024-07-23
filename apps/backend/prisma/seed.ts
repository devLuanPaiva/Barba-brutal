import { PrismaClient } from '@prisma/client';
import {
  Professional as PrismaProfessional,
  Service as PrismaService,
} from 'prisma/prisma-client';
import services from '@barba/core/src/constants/services.constants';
import professional from '@barba/core/src/constants/professionals.constants';

const prisma = new PrismaClient();

async function seed() {
  await prisma.professional.createMany({
    data: professional as PrismaProfessional[],
  });
  await prisma.service.createMany({ data: services as PrismaService[] });
}

seed();
