import { inject, injectable } from "tsyringe";
import User from "../infra/typeorm/entities/User";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import IUsersRepository from "../repositories/IUsersRepository";
import AppError from "../../../shared/errors/AppError";

interface IRequest {
    name: string;
    user_name: string;
    password: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider
    ) { }

    public async execute({ name, user_name, password }: IRequest): Promise<User> {
        const userExtists = await this.userRepository.findByUserName(user_name);

        if (userExtists) {
            throw new AppError('Usuário já cadastrado');
        }

        const hashPassword = await this.hashProvider.generateHash(password);

        const user = this.userRepository.create({
            name,
            user_name,
            password: hashPassword
        });

        return user;
    }

}

export default CreateUserService;