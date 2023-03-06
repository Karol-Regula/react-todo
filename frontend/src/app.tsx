import React, { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";
import { TodoList } from "./components/TodoState/TodoState";

type AppInfo = {
  versionNumber: string;
  gitSha: string;
};

export function App() {
  return (
    <RecoilRoot>
      <div>
        <h1>To Do List</h1>
        <TodoList></TodoList>
      </div>
    </RecoilRoot>
  );
}

// This is just to demonstrate frontend calling backend.
function AppInfo() {
  const [appInfo, setAppInfo] = useState<AppInfo>();
  useEffect(() => {
    (async () => {
      const resp = await fetch("/api/app/build-info");
      if (resp.ok) {
        const appInfoJson = (await resp.json()) as AppInfo;
        setAppInfo(appInfoJson);
      }
    })();
  }, []);

  return appInfo ? (
    <ul>
      <li>App Version: {appInfo.versionNumber}</li>
      <li>SHA: {appInfo.gitSha}</li>
    </ul>
  ) : (
    <ul />
  );
}
