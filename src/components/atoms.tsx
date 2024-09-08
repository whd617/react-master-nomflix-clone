import { atom } from 'recoil';

export interface IToDo {
  text: string;
  id: number;
  categroy: 'TO_DO' | 'DOING' | 'DONE';
}

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
});
