import React, { useState } from "react";

import { useForm } from 'react-hook-form';

/*function ToDoList() {
  const [toDo, setToDo] = useState('');
  const onChange = (event:React.FormEvent<HTMLInputElement>) => {
    const { 
      currentTarget : { value },
    } = event; 
    setToDo(value);
  };
  const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(toDo);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={toDo} placeholder="write a to do" />
        <button>Add</button>
      </form>
    </div>
  );
}*/
interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
  extraErrors?: string;
};

function ToDoList() {
  const { register, handleSubmit, formState:{ errors }, setError } = useForm<IForm>({
    defaultValues: {
      email: '@naver.com',
    },
  });
  const onValid = (data: IForm) => {
    if(data.password !== data.password1) {
      setError(
        "password1", 
        { message: 'password are not the same' }, 
        { shouldFocus: true }
      );
    }
    setError('extraErrors', {message: 'server offline. '});
  };
  console.log(errors);
  return (
    <div>
      <form style={{display: "flex", flexDirection: 'column'}} onSubmit={handleSubmit(onValid)}>
        <input {...register('email', { 
          required: 'email is required', 
          pattern: {
            value: /^[A-Za-z0-9._%+-]+@naver.com$/,
            message: 'only naver.com emails allowed',
          },
          })} 
          placeholder="Email" 
        />
        <span>{ errors?.email?.message }</span>
        <input {...register('firstName', { 
            required: 'write here', 
            validate: {
              noNico: (value) => value.includes('nico') ? "no nicos allowed": true,
              noNick: (value) => value.includes('nick') ? "no nick allowed": true
            },
          })} placeholder="First Name" />
        <span>{ errors?.firstName?.message }</span>
        <input {...register('lastName', { required: 'write here'})} placeholder="Last Name" />
        <span>{ errors?.lastName?.message }</span>
        <input {...register('username', { required: 'write here' })} placeholder="Username" />
        <span>{ errors?.username?.message }</span>
        <input {...register('password', { required: "password is required" })} placeholder="password" />
        <input {...register('password1', { required: "password is required" })} placeholder="password1" />
        <span>{ errors?.password1?.message }</span>
        <button>Add</button>
        <span>{ errors?.extraErrors?.message }</span>
      </form>
    </div>
  )
}

export default ToDoList;