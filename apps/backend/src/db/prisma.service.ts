import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleDestroy() {
    await this.$disconnect();
    // Na hora que destruir o moduele terá a conexão com o banco de dados destruida.

  }
  async onModuleInit() {
    await this.$connect();
    // Na hora que iniciar o module, ele terá uma conexão com o banco de dados.
  }
}
