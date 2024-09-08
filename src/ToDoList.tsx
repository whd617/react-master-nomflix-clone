import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

/* function ToDoList() {
  const [todo, setToDo] = useState('');
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(todo);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={todo} placeholder='Write a to do' />
        <button>Add</button>
      </form>
    </div>
  );
} */

interface IForm {
  toDo: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      toDo: 'I am working today',
    },
  });
  const onValid = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register('toDo', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Za-z0-9._%+=]+@naver.com$/,
              message: 'naver.com 주소만 허용됩니다.',
            },
          })}
          placeholder='Write a to do'
        />
        <span>{errors?.toDo?.message as string}</span>
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
