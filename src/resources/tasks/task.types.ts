interface ITaskUpdatedBody {
  title: string;
  order: number;
  description: string;
  userId: string | null;
  columnId: string | null;
  boardId: string | null;
}
interface ITaskDataFromRequest extends ITaskUpdatedBody {
  boardId: string | null;
}
interface ITask extends ITaskDataFromRequest {
  id: string;
}

export { ITask, ITaskDataFromRequest, ITaskUpdatedBody };
