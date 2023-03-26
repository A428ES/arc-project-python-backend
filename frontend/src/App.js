import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react"

function App() {
  const [users, setUsers] = useState([])

  let testVar = () => fetch('http://localhost:5000/user/login?email=sergio.estrada@accenture.com&password=testtest99@', {
    method: 'GET',
  }).then(response => {
        return response.json()
      })
      .then(data => {
        setUsers(data)
      })
    
    testVar()

  return (<>{users.results}</>
  );
}

export default App;
