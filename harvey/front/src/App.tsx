import React from "react";
import List from "./components/List/List";
import "./App.css";
import HeaderOne from "./components/HeaderOne/List";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HeaderOne />
        <List />
      </header>
    </div>
  );
}

export default App;
