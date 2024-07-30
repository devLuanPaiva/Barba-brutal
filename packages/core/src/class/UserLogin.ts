import ProviderCryptography from "../interfaces/ProviderCryptography.interface";
import RepositoryUser from "../interfaces/RepositoryUser.interface";
import { User } from "../user";

export default class UserLogin {
  constructor(
    private readonly repo: RepositoryUser,
    private readonly crypt: ProviderCryptography
  ) {}
  async execute(email: string, password: string): Promise<User | null> {
    const user = await this.repo.searchEmail(email);
    if (!user) throw new Error("Usuário não encontrado");
    const passwordMatch = await this.crypt.compare(password, user.password);
    if (!passwordMatch) throw new Error("Senha inválida");

    delete user.password;
    return user;
  }
}
