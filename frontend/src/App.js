import "./App.css";
import React, { useEffect, useState } from "react";
import "../src/user/login";
import UserLogin from "../src/user/login";
import UserLoggedIn from "../src/user/loggedin";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/loggedin" element={<UserLoggedIn />} />
      </Routes>
    </Router>
  );
}

export default App;
