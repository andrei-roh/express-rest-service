const uuid = require('uuid');

/**
 * Create task's class.
 * @param { Object } task - Task's information
 * @param { String } task.id - Task's id. Create with uuid version 4
 * @param { String } task.title - Task's title
 * @param { Number } task.order - Task's order
 * @param { String } task.description - Task's description
 * @param { String|null } task.userId - Task's user id
 * @param { String|null } task.boardId - Task's board id
 * @param { String|null } task.columnId - Task's column id
 */
class Task {
  constructor({
    id = uuid.v4(),
    title = 'DEFAULT TASK TITLE',
    order = 0,
    description = 'DEFAULT TASK DESCRIPTION',
    userId = null,
    boardId = null,
    columnId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;
