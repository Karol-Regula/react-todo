import React from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { todoListState } from "../TodoState/TodoState";
import { deleteTodo } from "../TodoItem/TodoItem"
import "./TodoClear.scss";

export function TodoListClear() {
  const setTodoList = useSetRecoilState(todoListState);
  const todoList = useRecoilValue(todoListState);

  const clearTodos = () => {
    for (var todo in todoList){
      deleteTodo(todoList[todo].databaseId);
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
