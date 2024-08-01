import User from "./User.interface";

export default interface RepositoryUser {
  save(user: User): Promise<void>;
  searchEmail(email: string): Promise<User>;
}
