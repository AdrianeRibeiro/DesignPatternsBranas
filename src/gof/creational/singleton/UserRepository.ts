import User from "./User";

export default interface UserRepository {
  save(user: User): Promise<void>;
  getByEmail(email: string): Promise<User | undefined>
}

// 1. definir uma propriedade estática
// 2. privar o construtor
// 3. criar o getInstance
export class UserRepositoryMemory implements UserRepository {
  private users: User[]

  //propriedade na classe
  static instance: UserRepositoryMemory

  private constructor() {
    this.users = []
  }

  async save(user: User): Promise<void> {
    this.users.push(user)
  }

  async getByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((user: User) => user.email === email)
    if(!user) return

    return user
  }

  static getInstance() {
    if(!UserRepositoryMemory.instance) {
      UserRepositoryMemory.instance = new UserRepositoryMemory()
    }

    return UserRepositoryMemory.instance
  }
}