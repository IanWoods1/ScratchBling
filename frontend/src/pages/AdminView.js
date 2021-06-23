import React from 'react';
import CreateScratcher from '../components/CreateScratcher';
import DeleteScratcher from '../components/DeleteScratcher';
import CurrentScratchers from '../components/CurrentScratchers';
import LogoutButton from '../components/LogoutButton';

const AdminView = () => {
 
  return (
    <div>
      <h1>Admin Panel</h1>
      <CreateScratcher />
      <DeleteScratcher />
      <CurrentScratchers />
      <br />
      <LogoutButton />
    </div>
  )
}

export default AdminView