// Homepage.jsx

import React from 'react';
import Sidebar from '../components/Sidebar';
import UserNameDisplay from "../components/UserNameDisplay";
import Button from '../components/Button';
import '../styles/Users.css';

const Users = () => {
  return (
    <div className="homepage">
      <Sidebar />
      <div className="allcontent">
        <UserNameDisplay/>
        <div className="content">
          <Button text="Ajouter un client"  className="button" />
        </div>
      </div>
    </div>
  );
};

export default Users;
