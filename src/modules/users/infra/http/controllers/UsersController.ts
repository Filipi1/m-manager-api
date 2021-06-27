import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateUserService from "../../../services/CreateUserService";
import OmitPasswordDTO from "../../../dtos/OmitPasswordDTO";
import ShowUserService from "../../../services/ShowUserService";

export default class UsersController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { name, user_name, password } = request.body;

        const createUser = container.resolve(CreateUserService);

        const user = await createUser.execute({
            name,
            user_name,
            password
        });

        const userOmitPassword = OmitPasswordDTO.toDTO(user)

        return response.status(201).json(userOmitPassword);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showUser = container.resolve(ShowUserService);

        const user = await showUser.execute({ id });

        const userOmitPassword = OmitPasswordDTO.toDTO(user)

        return response.status(200).json(userOmitPassword);
    }
}