import React from "react";
import { useSetRecoilState, useRecoilValue, SetterOrUpdater } from "recoil";
import { Todo, todoListState } from "../TodoState/TodoState";
import "./TodoClear.scss";
import api from '../../lib/api';

export function TodoListClear() {
  const setTodoList: SetterOrUpdater<Todo[]> = useSetRecoilState(todoListState);
  const todoList: Todo[] = useRecoilValue(todoListState);

  const clearTodos = (): void => {
    for (var todo in todoList){
      api.deleteTodo(todoList[todo]);
    }
    setTodoList((oldTodoList) => []);
  };

  return (
    <div className="clear">
      {todoList.length != 0 ? (
        <button onClick={clearTodos}>Clear Items</button>
      ) : null}
    </div>
  );
}
