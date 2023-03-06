import React, { useEffect, useState, ReactElement } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { TodoItemCreator, getId } from "../TodoCreate/TodoCreate";
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

export interface Todo {
  id: number;
  text: string;
  isComplete: Boolean;
  databaseId: number;
  animate: Boolean;
}

export function TodoList(): ReactElement {
  // main display function, todolist items, stats, have filter options
  const todoList = useRecoilValue<Todo[]>(filteredTodoListState); // uses value of list
  const setTodoList = useSetRecoilState(todoListState);

  useEffect(() => {
    (async () => {
      const resp = await fetch("/api/todos/all");
      if (resp.ok) {
        const todoJson = (await resp.json()) as Todo[];
        setTodoList(processTodos(todoJson));
      }
    })();
  }, []);

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

export function processTodos(todos) {
  for (var todo in todos) {
    todos[todo].isComplete = todos[todo].isComplete == "0" ? false : true;
    todos[todo].databaseId = todos[todo].id; // store the id sent from the DB
    todos[todo].id = getId();
    todos[todo].animate = false;
  }
  return todos.reverse();
}

export function updateTodos(setTodoList) {
  (async () => {
    const resp = await fetch("/api/todos/all");
    if (resp.ok) {
      const todoJson = (await resp.json()) as Todo[];
      setTodoList(processTodos(todoJson));
    }
  })();
}
