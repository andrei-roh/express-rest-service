interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  boardId: string;
  columnId: string | null;
  userId: string | null;
}

interface IColumn {
  id: string;
  title: string;
  order: number;
}

interface IBoard {
  id: string;
  title: string;
  columns: IColumn[];
}

interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

interface ILogin {
  login: string;
  password: string;
}

interface ILoader {
  id: string;
  login: string;
  issued?: number;
  expires?: number;
}

export { IUser, IBoard, IColumn, ITask, ILogin, ILoader }
