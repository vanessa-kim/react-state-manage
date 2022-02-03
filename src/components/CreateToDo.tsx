import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { selectedCategory, toDoState, IToDo } from '../atoms';

const AddForm = styled.form`
  display: flex;
  padding: 20px;
  border: 1px solid #fff;
  border-radius: 5px;
  margin-bottom: 20px;

  input {
    border: 0;
    padding: 10px;
    border-radius: 5px;
    width: calc(100% - 100px);
    margin-right: 6px;
    box-shadow: 0 5px 5px rgba(0,0,0,0.1);
  }

  button {
    width: 94px;
    border: 0;
    border-radius: 5px;
    background-color: #e94d4f;
    color: #fff;
    box-shadow: 0 5px 5px rgba(0,0,0,0.1);
    cursor: pointer;

    &:hover {
      background-color: #d54648;
    }
    &:active {
      background-color: #c73f41;
    }
  }
`;

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [toDos, setToDos] = useRecoilState<IToDo[]>(toDoState);
  
  // initial load from localstorage
  useEffect(()=>{
    const strToDos = localStorage.getItem('toDos');
    const jsonToDos = strToDos && JSON.parse(strToDos);
    if (jsonToDos && jsonToDos.length > 0) {
      setToDos(jsonToDos);
    }
  }, []);

  const category = useRecoilValue(selectedCategory);
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
    <AddForm onSubmit={handleSubmit(handleValid)}>
      <input 
        {...register('toDo', {
          required: 'Please write a To Do.'
        })} 
        placeholder="write a to do" 
      />
      <button>Add</button>
    </AddForm>
  );
};

export default CreateToDo;