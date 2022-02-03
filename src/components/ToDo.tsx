import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";
import styled from "styled-components";

const DoList = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.15);
  padding: 20px;
  margin-top: 10px;
  border-radius: 5px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  
  span {
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 10px;
    font-size: 15px;
  }
`;

const BtnGp = styled.div`
  display: flex;
  justify-content: flex-end;
`;


const ChkBtn = styled.button`
  width: 70px;
  height: 30px;
  font-size: 13px;
  border-radius: 30px;
  border: 0;
  margin: 0 3px;
  cursor: pointer;

  &:hover {
    background-color: #f1e8cf;
  }
  
  &:active {
    background-color: #f3dfa9;
  }
`;

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
    <DoList>
      <span>{text}</span>
      <BtnGp>
        {category !== 'DOING' &&<ChkBtn name="DOING" onClick={onClick}>Doing</ChkBtn>}
        {category !== 'TO_DO' &&<ChkBtn name="TO_DO" onClick={onClick}>To Do</ChkBtn>}
        {category !== 'DONE' && <ChkBtn name="DONE" onClick={onClick}>Done</ChkBtn>}
        {<ChkBtn onClick={deleteToDo}>Delete</ChkBtn>}
      </BtnGp>
    </DoList>
  );
}

export default ToDo;