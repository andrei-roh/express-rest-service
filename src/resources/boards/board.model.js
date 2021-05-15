const uuid = require('uuid');

class Board {
  constructor({
    id = uuid.v4(),
    title = 'DEFAULT BOARD TITLE',
    columns = [
      {
        id: uuid.v4(),
        title: 'DEFAULT COLUMN TITLE',
        order: 0
      }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
