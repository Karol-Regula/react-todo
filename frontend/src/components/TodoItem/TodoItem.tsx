import React from "react";
import { useRecoilState } from "recoil";
import { todoListState } from "../TodoState/TodoState";
import "./TodoItem.scss";

export function TodoItem({ item }) {
  const [todoList, setTodoList] = useRecoilState(todoListState); // todoList is the state (array of items), setTodoList is a setter
  const index = todoList.findIndex((listItem) => listItem === item); // find the index of the item that will be operated on
  const myRef = React.createRef<HTMLInputElement>();

  let className = item.animate ? "todo-item-animate" : "todo-item";

  const editItemText = ({ target: { value } }) => {
    // when item text is modified, this is called
    const newList = replaceItemAtIndex(todoList, index, {
      // replace the item at the index with item, text is replaced
      ...item,
      text: value,
    });
    setTodoList(newList); // update list with new list
    editTodo(item.databaseId, value);
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });
    setTodoList(newList);

    let complete;
    if (item.isComplete) {
      complete = 0;
    } else {
      complete = 1;
    }
    completeTodo(item.databaseId, complete);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);
    setTodoList(newList);
    deleteTodo(item.databaseId);
  };

  const editItem = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current != null) {
      ref.current.focus();
    }
  };

  let style;
  if (item.isComplete) {
    style = {
      textDecoration: "line-through",
    };
  }

  return (
    <div className={className}>
      <input
        type="text"
        className="todo-edit"
        value={item.text}
        onChange={editItemText}
        ref={myRef}
        style={style}
      />
      <button className="edit-button" onClick={() => editItem(myRef)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-pencil-square"
          viewBox="0 0 16 16"
        >
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
          <path
            fillRule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
          />
        </svg>
      </button>
      <label className="container">
        <input
          type="checkbox"
          checked={item.isComplete}
          onChange={toggleItemCompletion}
        />
        <span className="checkmark"></span>
      </label>
      <button className="delete-button" onClick={deleteItem}>
        <span className="button-text">&#215;</span>
      </button>
    </div>
  );
}

function replaceItemAtIndex(arr, index, newValue) {
  // use slicing and spread syntax to replace an item
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  // use slicing and spread syntax to remove an item
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export async function deleteTodo(todoId) {
  await fetch(`http://localhost:8000/api/todos/deleteTodo/?todoId=${todoId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

async function completeTodo(todoId, isComplete) {
  await fetch(
    `http://localhost:8000/api/todos/completeTodo/?todoId=${todoId}&isComplete=${isComplete}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

async function editTodo(todoId, todoText) {
  await fetch(
    `http://localhost:8000/api/todos/editTodo/?todoId=${todoId}&todoText=${todoText}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
