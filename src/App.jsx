import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import './styles/index.css';
import Login from './Layouts/Login';
import Homepage from './Layouts/Homepage';
import Users from "./Layouts/Users";
import User from "./Layouts/User.jsx";
import AddUser from "./Layouts/AddUser.jsx";
import Paints from "./Layouts/Paints.jsx";
import AddPainting from "./Layouts/AddPainting.jsx";
import EditUser from './Layouts/EditUser.jsx';
import EditPaint from './Layouts/EditPaint.jsx';
import ForbiddenAccess from './Layouts/ForbiddenAccess.jsx';
import { AuthProvider,useAuthLogin } from './context/authContext.jsx';


const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    try {

      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;
      
      if (userRole === 'CUSTOMER') {
        return <Navigate to="/lost" />;
      }

      return element;
    } catch (error) {
      console.error('Token decoding failed:', error);
      return <Navigate to="/login" />;
    }
  }

  return <Navigate to="/login" />;
};

function App() {
  return (
      <Router>
    <AuthProvider>

        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<PrivateRoute element={<Homepage />} />}  />
            <Route path="/users" element={<PrivateRoute element={<Users />} />} />
            <Route path="/add-user" element={<PrivateRoute element={<AddUser />} />} />
            <Route path="/users/:id" element={<PrivateRoute element={<User />} />}/>
            <Route path="/edit/:id" element={<EditUser />} />
            <Route path="/paints" element={<PrivateRoute element={<Paints />} />}/>
            <Route path="/add-paint" element={<PrivateRoute element={<AddPainting />} />}/>
            <Route path="/edit-paint/:id" element={<EditPaint />} />
            <Route path="/lost" element={<ForbiddenAccess />} />
            {/* Redirection par défaut vers /login */}
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
    </AuthProvider>

      </Router>
  );
}

export default App;
