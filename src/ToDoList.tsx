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

function ToDoList() {
  const { register, watch } = useForm();
  console.log(watch());
  return (
    <div>
      <form>
        <input {...register('Email')} placeholder="Email" />
        <input {...register('First Name')} placeholder="Email" />
        <input {...register('Last Name')} placeholder="Email" />
        <input {...register('Uername')} placeholder="Email" />
        <input {...register('Password')} placeholder="Email" />
        <input {...register('Password1')} placeholder="Email" />
        <button>Add</button>
      </form>
    </div>
  )
}

export default ToDoList;