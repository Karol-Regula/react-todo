import React, { ReactElement, useState } from "react";
import { useSetRecoilState } from "recoil";
import { todoListState } from "../TodoState/TodoState";
import "./TodoCreate.scss";

export function TodoItemCreator(): ReactElement {
  // used to create a todo item, houses the main onChange function which calls the setInputValue
  const [inputValue, setInputValue] = useState(""); // use an empty string as state, variable called inputValue, setter function
  const setTodoList = useSetRecoilState(todoListState); // returns a function that can be used to set the state

  const addItem = async () => {
    let response = await sendTodo(inputValue, 0);
    setTodoList((oldTodoList) => [
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
        databaseId: response,
        animate: true,
      },
      ...oldTodoList,
    ]);
    setInputValue("");
  };

  const onChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addItem();
    }
  };

  return (
    <div className="input-todo">
      <input
        type="text"
        value={inputValue}
        onChange={onChange}
        placeholder="to do..."
        onKeyDown={handleKeyDown}
      />
      <button onClick={addItem}>Add Item</button>
    </div>
  );
}

let id = 0;
export function getId() {
  // create unique ids
  return id++;
}

async function sendTodo(todoText, isComplete) {
  const response = await fetch(
    `http://localhost:8000/api/todos/createTodo/?todoText=${todoText}&isComplete=${isComplete}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
}
