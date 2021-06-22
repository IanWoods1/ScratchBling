import React from 'react';
import CreateScratcher from '../components/CreateScratcher';
import DeleteScratcher from '../components/DeleteScratcher';
import CurrentScratchers from '../components/CurrentScratchers';
import UpdateScratcher from '../components/UpdateScratcher';
import LogoutButton from '../components/LogoutButton';
import ConsumerViewButton from '../components/ConsumerViewButton';

const AdminView = () => {
 
  return (
    <div>
      <LogoutButton />
      <br />
      <ConsumerViewButton />
      <CreateScratcher />
      <DeleteScratcher />
      <CurrentScratchers />
    </div>
  )
}

export default AdminView