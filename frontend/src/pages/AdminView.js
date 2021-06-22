import React from 'react';
import CreateScratcher from '../components/CreateScratcher';
import DeleteScratcher from '../components/DeleteScratcher';
import CurrentScratchers from '../components/CurrentScratchers';
import LogoutButton from '../components/LogoutButton';

const AdminView = () => {
 
  return (
    <div>
      <LogoutButton />
      <CreateScratcher />
      <DeleteScratcher />
      <CurrentScratchers />
    </div>
  )
}

export default AdminView