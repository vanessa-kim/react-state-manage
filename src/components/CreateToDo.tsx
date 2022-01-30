import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from '../atoms';

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [toDos, setToDos] = useRecoilState(toDoState);
  
  // initial load from localstorage
  useEffect(()=>{
    const strToDos = localStorage.getItem('toDos');
    const jsonToDos = strToDos && JSON.parse(strToDos);
    if (jsonToDos && jsonToDos.length > 0) {
      setToDos(jsonToDos);
    }
  }, []);

  const category = useRecoilValue(categoryState);
  const handleValid = ({ toDo }: IForm) => {
    setValue('toDo', '');
    setToDos((oldToDos)=> [
        { text: toDo, id: Date.now(), category }, 
        ...oldToDos, 
      ]);
  }; 
  
  // set localstorage everytime changes toDos
  useEffect(()=>{
    localStorage.setItem('toDos', JSON.stringify(toDos));
  }, [toDos]);

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input 
        {...register('toDo', {
          required: 'Please write a To Do.'
        })} 
        placeholder="write a to do" 
      />
      <button>Add</button>
    </form>
  );
};

export default CreateToDo;