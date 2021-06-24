import ICreateUserDTO from "../../../dtos/ICreateUserDTO";
import IUsersRepository from "../../../repositories/IUsersRepository";
import { getRepository, Repository } from "typeorm";
import User from "../entities/User";

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne(id);

        return user;
    }

    public async findByUserName(user_name: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { user_name }
        })

        return user;
    }

    public async create(data: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create(data);

        await this.ormRepository.save(user);

        return user;
    }
}

export default UsersRepository;