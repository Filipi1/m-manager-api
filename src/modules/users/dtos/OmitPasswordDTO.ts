import User from '../infra/typeorm/entities/User';

export default class OmitPasswordDTO {
    public static toDTO(user: User): Omit<User, 'password'> {
        return {
            id: user.id,
            name: user.name,
            user_name: user.user_name,
            created_at: user.created_at,
            updated_at: user.updated_at
        };
    }
}
