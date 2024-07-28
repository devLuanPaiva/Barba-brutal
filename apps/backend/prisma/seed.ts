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
// Esse arquivo pega todos os profissionais e serviços do core da aplicação e assim preenche o banco de dados

// Para isso, é necessário referenciar esse arquivo la no package com esse comando abaixo:
// "prisma": {
//     "seed": "npx ts-node prisma/seed.ts"
//   }

// No terminal, basta colocar o comando npx prisma db seed