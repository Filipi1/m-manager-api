import { Request, Response } from "express";
import CreateUserService from "../../../services/CreateUserService";
import { container } from "tsyringe";

export default class UsersController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { name, user_name, password } = request.body;

        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute({
            name,
            user_name,
            password
        });

        return response.status(201).json(user);
    }
}