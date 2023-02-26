import React from "react";
import { selector, useRecoilState } from "recoil";
import { todoListFilterState, todoListState } from "../TodoState/TodoState";
import "./TodoFilter.scss";

export const filteredTodoListState = selector({
  key: "FilteredTodoList",
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case "Show Completed":
        return list.filter((item) => item.isComplete);
      case "Show Uncompleted":
        return list.filter((item) => !item.isComplete);
      case "Show Happy":
        return list.filter((item) => item.rating > 3);
      default:
        return list;
    }
  },
});

export function TodoListFilters() {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const updateFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  return (
    <div className="filter">
      <select value={filter} onChange={updateFilter}>
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
        <option value="Show Happy">Happy</option>
      </select>
    </div>
  );
}
