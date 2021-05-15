const uuid = require('uuid');

class Task {
  constructor({
    id = uuid.v4(),
    title = 'DEFAULT TASK TITLE',
    order = 0,
    description = 'DEFAULT TASK DESCRIPTION',
    userId = null,
    boardId = 'DEFAULT BOARD ID',
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
