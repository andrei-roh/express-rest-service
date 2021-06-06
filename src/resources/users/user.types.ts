interface IUserUpdatedBody {
  name: string;
  login: string;
  password: string;
}
interface IUser extends IUserUpdatedBody {
  id: string;
}
interface IUserForResponse {
  id: string;
  name: string;
  login: string;
}

export { IUserForResponse, IUser, IUserUpdatedBody };
