import React from 'react';
import CreateScratcher from '../components/CreateScratcher';
import DeleteScratcher from '../components/DeleteScratcher';
import CurrentScratchers from '../components/CurrentScratchers';
import UpdateScratcher from '../components/UpdateScratcher';
import LogoutButton from '../components/LogoutButton';
import AdminButton from '../components/AdminButton';

const ConsumerView = () => {
 
  return (
    <div>
      <LogoutButton />
      {localStorage.getItem("user") === "admin" && 
      <div><br/><AdminButton /></div>}
      <CurrentScratchers />
    </div>
  )
}

export default ConsumerView