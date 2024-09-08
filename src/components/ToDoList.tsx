import React from 'react';
import { useForm } from 'react-hook-form';
import { atom, useRecoilState } from 'recoil';

interface IToDo {
  text: string;
  id: number;
  categroy: 'TO_DO' | 'DOING' | 'DONE';
}

interface IForm {
  toDo: string;
}

const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
});

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), categroy: 'TO_DO' },
      ...oldToDos,
    ]);
    setValue('toDo', '');
  };
  console.log(toDos);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('toDo', { required: 'Please write a To Do' })}
          placeholder='Write a to do'
        />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
