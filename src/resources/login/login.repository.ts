import { getConnectionToDatabase } from '../../common/database';
import { User } from '../users/user.model';
import { ILogin } from '../types';

const repository = getConnectionToDatabase()!.getRepository(User);

export const loginUser = async (user: ILogin): Promise<User | undefined> => repository.findOne({ where: { login: user.login } });
