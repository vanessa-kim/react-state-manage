import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { categoryState } from '../atoms';

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
    <div>
      <form onSubmit={handleSubmit(handleValid)}>
        <input 
          {...register('category', {
            required: 'Please write a new category'
          })} 
            placeholder="wirte a new category" 
          />
        <button>Add</button>
      </form>
    </div>
  );
}

export default CreateCategory;