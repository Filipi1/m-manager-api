import ICreateUserDTO from "../dtos/ICreateUserDTO";
import User from "../infra/typeorm/entities/User";

export default interface IUsersRepository {
    findById(id: string): Promise<User | undefined>;
    findByUserName(user_name: string): Promise<User | undefined>;
    create(data: ICreateUserDTO): Promise<User>;
    delete(id: string): Promise<void>;
}