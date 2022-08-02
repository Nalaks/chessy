export interface BoardProps {
  board: IBoard[]
  turn: string
}

export interface BoardSquareProps {
  piece: BoardRow
  black: boolean
  position: string
}

export interface PieceProps {
  piece: BoardRow
  position: string
}

export interface SquareProps {
  children: React.ReactNode
  black: boolean
}

export type IBoard = BoardRow[]

export interface BoardRow {
  square: string
  type: string
  color: string
}

export enum ChessBoardColumn {
  a,
  b,
  c,
  d,
  e,
  f,
  g,
  h
}

export interface DropItem {
  type: string
  id: string
}

export interface BehaviorType {
  board: any
  pendingPromotion?: PendingPromotion
}

export type PendingPromotion = {
  from: string
  to: string
  color: string
}

export interface PromoteProps {
  promotion: PendingPromotion
}

export enum PromotionPieces {
  r,
  n,
  b,
  q
}

export type PromotionPiece = keyof typeof PromotionPieces | undefined
