const uuid = require('uuid');

/**
* Create board's class.
* @param { Object } board - Board's information
* @param { String } board.id - Board's id. Create with uuid version 4
* @param { String } board.title - Board's title
* @param { Array<Column> } board.columns - Board's columns
*/
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
