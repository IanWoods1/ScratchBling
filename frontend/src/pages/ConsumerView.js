import React from 'react';
import CurrentScratchers from '../components/CurrentScratchers';
import LogoutButton from '../components/LogoutButton';

const ConsumerView = () => {
 
  return (
    <div>
      <h1>ScratchBling Store</h1>
      <CurrentScratchers />
      <br />
      <LogoutButton />
    </div>
  )
}

export default ConsumerView