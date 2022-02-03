import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { categoryState } from '../atoms';

const Form = styled.form`
  padding: 10px;
  width: 100%;

  input {
    border: 0;
    border-radius: 5px;
    padding: 10px;
    width: calc(100% - 100px);
    margin-right: 6px;
    box-shadow: 0 5px 5px rgba(0,0,0,0.1);
  }

  button {
    width: 94px;
    border-radius: 5px;
    border: 0;
    height: 36px;
    color: #fff;
    background-color: #e94d4f;
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
interface ICategory {
  category: string;
}

function CreateCategory() {
  const { register, handleSubmit, setValue } = useForm<ICategory>();
  const [categories, setCategories] = useRecoilState<ICategory[]>(categoryState);
  const handleValid = ({ category }: ICategory) => {
    setValue('category', '');
    setCategories((oldCategories) => [
      { category },
      ...oldCategories,
    ]);
  } 

  // initial load from localstorage
  useEffect(() => {
    const strCategories = localStorage.getItem('categories');
    const jsonCategories = strCategories && JSON.parse(strCategories);
    if (jsonCategories && jsonCategories.length > 0) {
      setCategories(jsonCategories);
    }
  }, []);

  // set localstorage evertime changes categories
  useEffect(()=>{
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);
  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <input 
        {...register('category', {
          required: 'Please write a new category'
        })} 
          placeholder="wirte a new category" 
        />
      <button>Add</button>
    </Form>
  );
}

export default CreateCategory;