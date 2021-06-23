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

export { IUser, IBoard, IColumn, ITask }
