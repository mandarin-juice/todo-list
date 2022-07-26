import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { worker } from "@mocks/browser";
import CssReset from "@styles/css-reset";
import GlobalStyles from "@styles/global";

// TODO : 테스트용 목서버 실행 환경 변수에 따라서 실행여부를 결정할 수 있도록 수정해야 함
worker.start();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <CssReset />
    <GlobalStyles />
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
