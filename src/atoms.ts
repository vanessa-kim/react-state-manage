import { atom, selector } from 'recoil';

export interface ICategory {
  category: string;
}

export interface IToDo {
  text: string;
  id: number;
  category: string;
}


export const categoryState = atom<ICategory[]>({
  key: 'category',
  default: [
    { category: 'TO_DO' },
    { category: 'DOING' },
    { category: 'DONE' },
  ],
});

export const selectedCategory = atom<string>({
  key: 'selectedCategory',
  default: 'TO_DO',
});

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
});

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(selectedCategory);
    return toDos.filter(toDo => toDo.category === category);
  }
});
