// App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/index.css';
import Login from './Layouts/Login';
import Homepage from './Layouts/Homepage';
import Users from "./Layouts/Users";
import User from "./Layouts/User.jsx";
import AddUser from "./Layouts/AddUser.jsx";
import Paints from "./Layouts/Paints.jsx";
import AddPainting from "./Layouts/AddPainting.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/users/:name" element={<User />} />
          <Route path="/paints" element={<Paints />} />
          <Route path="/add-paint" element={<AddPainting />} />
          {/* Redirection par défaut vers /login */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
