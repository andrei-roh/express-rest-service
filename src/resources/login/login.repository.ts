import { getConnectionToDatabase } from '../../common/database';
import { User } from '../users/user.model';

const repository = getConnectionToDatabase()!.getRepository(User);

export const loginUser = async (login: string) => repository.findOne(login);
