import React from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { todoListState } from "../TodoState/TodoState";
import "./TodoClear.scss";

export function TodoListClear() {
  const setTodoList = useSetRecoilState(todoListState);

  const clearTodos = () => {
    setTodoList((oldTodoList) => []);
  };
  const todoList = useRecoilValue(todoListState);

  return (
    <div className="clear">
      {todoList.length != 0 ? (
        <button onClick={clearTodos}>Clear Items</button>
      ) : null}
    </div>
  );
}
