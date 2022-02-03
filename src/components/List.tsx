import ToDo from './ToDo';
import { toDoSelector } from '../atoms'; 
import { useRecoilValue } from 'recoil';

function List() {
  const toDos = useRecoilValue(toDoSelector);
  return (
    <>
      {toDos?.map(toDo => (<ToDo key={toDo.id} {...toDo}/>))}
    </>
  );
}

export default List;