// App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Layouts/Login';
import Homepage from './Layouts/Homepage';
import Users from "./Layouts/Users";
import User from "./Layouts/User.jsx";
import './styles/index.css';
import AddUser from "./Layouts/AddUser.jsx"; // Import du fichier principal des styles

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
          {/* Redirection par défaut vers /login */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
