import User from "./User";
import UserRepository, { UserRepositoryMemory } from "./UserRepository";

// injeção de dependencia usa a inversão de dependencia
export default class Signup {
  userRepository: UserRepository;

  constructor() {
    this.userRepository = UserRepositoryMemory.getInstance()
  }

  async execute(input: Input): Promise<void> {
    const user = User.create(input.name, input.email, input.password)
    await this.userRepository.save(user)
  }
}

type Input = {
  name: string,
  email: string,
  password: string
}