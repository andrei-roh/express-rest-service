import { TaskUpdate } from "./task.update";

const getUpdateTask = (id: string, TaskUpdate: TaskUpdate): TaskUpdate => {
  const { title, order, description, userId, boardId, columnId } = TaskUpdate;
  return { id, title, order, description, userId, boardId, columnId };
};

export { getUpdateTask };
