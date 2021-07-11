import { TaskUpdate } from "./task.update";

const getUpdateTask = (id: string, taskUpdate: TaskUpdate): TaskUpdate => {
  const { title, order, description, userId, boardId, columnId } = taskUpdate;
  return { id, title, order, description, userId, boardId, columnId };
};

export { getUpdateTask };
