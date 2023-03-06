import React from "react"; // need this in any file that will output react
import { selector, useRecoilValue } from "recoil";
import "./TodoStats.scss";
import { todoListState } from "../TodoState/TodoState";

const todoListStatsState = selector({
  key: "TodoListStats",
  get: ({ get }) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted =
      totalNum === 0 ? 0 : (totalCompletedNum / totalNum) * 100;
    const totalHappyNum = todoList.filter((item) => item.rating > 3).length;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
      totalHappyNum,
    };
  },
});

export function TodoListStats() {
  const {
    totalNum,
    totalCompletedNum,
    totalUncompletedNum,
    percentCompleted,
    totalHappyNum,
  } = useRecoilValue(todoListStatsState);

  const formattedPercentCompleted = Math.round(percentCompleted);
  console.log(totalHappyNum);

  return (
    <div className="stats">
      <span className="stat">{totalNum} total</span>
      <span className="stat">
        {totalCompletedNum} completed ({formattedPercentCompleted}%)
      </span>
      <span className="stat">{totalUncompletedNum} not completed</span>
      <span className="stat">{totalHappyNum} fun items!</span>
    </div>
  );
}
