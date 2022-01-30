import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from '../atoms';

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const handleValid = ({ toDo }: IForm) => {
    setValue('toDo', '');
    setToDos((oldToDos)=> [
        { text: toDo, id: Date.now(), category }, 
        ...oldToDos, 
      ]);
  };

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