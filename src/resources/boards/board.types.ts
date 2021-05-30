interface IBoardUpdatedBody {
  title: string;
  columns: object;
}
interface IBoard extends IBoardUpdatedBody {
  id: string;
}

export { IBoard, IBoardUpdatedBody };
