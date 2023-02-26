import React, { ReactElement } from "react";
import { atom, useRecoilValue } from "recoil";
import { TodoItemCreator } from "../TodoCreate/TodoCreate";
import { filteredTodoListState } from "../TodoFilter/TodoFilter";
import { TodoItem } from "../TodoItem/TodoItem";
import { TodoListClear } from "../TodoClear/TodoClear";

export const todoListState = atom<Todo[]>({
  // track todolist, default state is empty array
  key: "TodoList",
  default: [],
});

export const todoListFilterState = atom({
  key: "TodoListFilter",
  default: "Show All",
});

interface Todo {
  id: number;
  text: string;
  isComplete: Boolean;
  rating: number;
}

export function TodoList(): ReactElement {
  // main display function, todolist items, stats, have filter options
  const todoList = useRecoilValue<Todo[]>(filteredTodoListState); // uses value of list
  return (
    <>
      <TodoItemCreator />
      {todoList.map(
        (
          todoItem // map todoItems to html components
        ) => (
          <TodoItem key={todoItem.id} item={todoItem} />
        )
      )}
      <TodoListClear />
    </>
  );
}
