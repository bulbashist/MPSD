export interface INote {
  id: string;
  content: string;
  isBeingEdited?: boolean;
  isBeingDeleted?: boolean;
  color?: string;
}

export const Colors = new Map<number, string>([
  [0, '#fd99ff'],
  [1, '#ff9e9e'],
  [2, '#91f48f'],
  [3, '#fff599'],
  [4, '#9effff'],
  [5, '#b69cff'],
]);
