import ProviderCryptography from "../interfaces/ProviderCryptography.interface";
import RepositoryUser from "../interfaces/RepositoryUser.interface";
import { User } from "../user";

export default class UserRegister {
  constructor(
    private readonly repo: RepositoryUser,
    private readonly crypt: ProviderCryptography
  ) {}
  async execute(user: User): Promise<void> {
    const existingUser = await this.repo.searchEmail(user.email);
    if (existingUser) throw new Error("Usuário já cadastrado");
    const passwordCryptography = await this.crypt.cryptography(user.password);
    const newUser: User = {
      ...user,
      password: passwordCryptography,
      barber: false,
    };

    await this.repo.save(newUser);
  }
}
