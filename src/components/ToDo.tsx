import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget: { name }} = event;
    setToDos(oldToDos => {
      const targetIndex = oldToDos.findIndex(todo => todo.id === id);
      const newToDo = { text, id, category: name as any};
      return [
        ...oldToDos.slice(0, targetIndex), 
        newToDo, 
        ...oldToDos.slice(targetIndex + 1)
      ];
    });
  };
  const deleteToDo = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos(oldToDos => {
      const targetIndex = oldToDos.findIndex(todo => todo.id === id);
      const editToDos = [...oldToDos];
      editToDos.splice(targetIndex, 1);
      return editToDos;
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== 'DOING' &&<button name="DOING" onClick={onClick}>Doing</button>}
      {category !== 'TO_DO' &&<button name="TO_DO" onClick={onClick}>To Do</button>}
      {category !== 'DONE' && <button name="DONE" onClick={onClick}>Done</button>}
      {<button onClick={deleteToDo}>Delete</button>}
    </li>
  );
}

export default ToDo;