import { useRecoilState, useRecoilValue } from 'recoil';
import CreateToDo from './CreateToDo';
import CreateCategory from './CreateCategory';
import { toDoSelector, categoryState, selectedCategory } from '../atoms'; 
import ToDo from './ToDo';
import React from 'react';

function ToDoList() {

  const toDos = useRecoilValue(toDoSelector);
  const categories = useRecoilValue(categoryState);
  const [category, setCategory] = useRecoilState(selectedCategory);
  const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateCategory></CreateCategory>
      <hr />
      <select value={category} onInput={onInput}>
        { categories.map(item => (
          <option value={item.category} key={item.category}>
            {item.category}
          </option>
         ))}
      </select>
      <CreateToDo />
      { toDos?.map(toDo => <ToDo key={toDo.id} {...toDo}/>)}
    </div>
  )
}

export default ToDoList;