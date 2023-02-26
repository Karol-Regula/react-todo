import React from "react";
import { RecoilRoot } from "recoil";
import { CharacterCounter } from "./components/Counter";
import { TodoList } from "./components/TodoState/TodoState";

export function App() {
  return (
    <RecoilRoot>
      {/* 
                <ClientList attorneyId={2}></ClientList>
                <CharacterCounter></CharacterCounter> */}
      <h1>To Do List</h1>
      <TodoList></TodoList>
    </RecoilRoot>
  );
}
