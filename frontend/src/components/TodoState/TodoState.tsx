import React, { ReactElement, useEffect } from 'react';
import { atom, SetterOrUpdater, useRecoilValue, useSetRecoilState } from 'recoil';
import { TodoItemCreator } from '../TodoCreate/TodoCreate';
import { TodoItem } from '../TodoItem/TodoItem';
import { TodoListClear } from '../TodoClear/TodoClear';
import api from '../../lib/api';

export const todoListState = atom<Todo[]>({
  key: 'TodoList',
  default: [],
});

export interface Todo {
  _id: number;
  text: string;
  isComplete: Boolean;
  id?: number;
  animate: Boolean;
}

export function TodoList(): ReactElement {
  const todoList: Todo[] = useRecoilValue(todoListState);
  const setTodoList: SetterOrUpdater<Todo[]> = useSetRecoilState(todoListState);

  useEffect((): void => {
    (async () => {
      setTodoList(await (await api.getTodos()).reverse());
    })();
  }, []);

  return (
    <>
      <TodoItemCreator />
      {todoList.map((todoItem) => (
        <TodoItem key={todoItem._id} item={todoItem} />
      ))}
      <TodoListClear />
    </>
  );
}
