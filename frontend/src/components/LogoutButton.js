import React, { useContext } from 'react';

import { useHistory } from 'react-router-dom';


const LogoutButton = () => {

  const history = useHistory();

  const logout = () => {
    localStorage.setItem("auth-token", "");
    localStorage.setItem("user", "");
    history.push("/");
  };

  return (
    <>
      <div id="logout-button">
        <button onClick={logout}>Log out</button>
      </div>
    </>
  )
}

export default LogoutButton