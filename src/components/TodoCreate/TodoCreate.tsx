import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { todoListState } from "../TodoState/TodoState";
import "./TodoCreate.scss";

export function TodoItemCreator() {
  // used to create a todo item, houses the main onChange function which calls the setInputValue
  const [inputValue, setInputValue] = useState(""); // use an empty string as state, variable called inputValue, setter function
  const [ratingValue, setRatingValue] = useState(1); // use an empty string as state, variable called inputValue, setter function
  const setTodoList = useSetRecoilState(todoListState); // returns a function that can be used to set the state

  const addItem = () => {
    setTodoList((oldTodoList) => [
      // using the state setting function from above
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
        rating: ratingValue,
      },
      ...oldTodoList,
    ]);
    setInputValue("");
    setRatingValue(1);
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
function getId() {
  // create unique ids
  console.log(id);
  return id++;
}
