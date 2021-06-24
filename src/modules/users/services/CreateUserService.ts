import { inject, injectable } from "tsyringe";
import User from "../infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
    name: string;
    user_name: string;
    password: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository
    ) { }

    public async execute({ name, user_name, password }: IRequest): Promise<User> {
        const userExtists = await this.userRepository.findByUserName(user_name);

        if (userExtists) {
            throw new Error('Usuário já cadastrado.');
        }

        const user = this.userRepository.create({
            name,
            user_name,
            password
        });

        return user;
    }

}

export default CreateUserService;