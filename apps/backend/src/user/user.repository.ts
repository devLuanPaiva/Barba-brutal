import { RepositoryUser, User } from '@barba/core';
import { PrismaService } from 'src/db/prisma.service';

export class UserRepository implements RepositoryUser {
  constructor(private readonly prismaService: PrismaService) {}

  async save(user: User): Promise<void> {
    await this.prismaService.user.upsert({
      where: { id: user.id ?? -1 },
      update: user as any,
      create: user as any,
    });
  }
  async searchEmail(email: string): Promise<User> {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }
}
