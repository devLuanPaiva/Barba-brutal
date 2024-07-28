import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(3001);
  // aqui permite que o projeto backend rode na porta 3001 e aceite requisições de outras portas atraves do cors: true
}
bootstrap();
