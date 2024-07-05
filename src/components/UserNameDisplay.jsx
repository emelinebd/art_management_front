import React, {useEffect} from 'react';
import { useAuthLogin } from '../context/authContext';

const UserNameDisplay = () => {
  const userName = localStorage.getItem('userName');
  const userFirstName = localStorage.getItem('userFirstName');


  return <div className="user-display">
      <p>{userName} {userFirstName}</p>
    </div>
};

export default UserNameDisplay;
