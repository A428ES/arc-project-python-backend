import "./App.css";
import React from "react";
import UserLogin from "../src/user/login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./layout/navigationbar";

function App() {
  return (
    <>
      <NavigationBar />
      <Router>
        <Routes></Routes>
      </Router>
    </>
  );
}

export default App;
