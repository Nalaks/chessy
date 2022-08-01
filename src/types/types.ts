export interface BoardProps {
  board: IBoard[]
}

export interface BoardSquareProps {
  piece: BoardRow
}

export interface PieceProps {
  piece: BoardRow
}

export type IBoard = BoardRow[]

export interface BoardRow {
  square: string
  type: string
  color: string
}

export interface SquareProps {
  children: React.ReactNode
}
