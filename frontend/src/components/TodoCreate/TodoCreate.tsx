import React, { ReactElement, useState } from 'react';
import { SetterOrUpdater, useSetRecoilState } from 'recoil';
import Api from '../../lib/api';
import { Todo, todoListState } from '../TodoState/TodoState';
import './TodoCreate.scss';

export function TodoItemCreator(): ReactElement {
  // used to create a todo item, houses the main onChange function which calls the setInputValue
  const [inputValue, setInputValue] = useState(''); // use an empty string as state, variable called inputValue, setter function
  const setTodoList: SetterOrUpdater<Todo[]> = useSetRecoilState(todoListState); // returns a function that can be used to set the state

  const addItem = async (): Promise<void> => {
    const todo: Todo = {
      _id: getId(),
      text: inputValue,
      isComplete: false,
      animate: true,
    };

    let response: Todo = await Api.createTodo(todo);
    todo.id = response.id;

    setTodoList((oldTodoList) => [todo, ...oldTodoList]);
    setInputValue('');
  };

  const onChange = ({ target: { value } }): void => {
    setInputValue(value);
  };

  const handleKeyDown = (event): void => {
    if (event.key === 'Enter') {
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

let _id: number = 0;
export function getId(): number {
  return _id++;
}
