import React from 'react';
import CurrentScratchers from '../components/CurrentScratchers';
import LogoutButton from '../components/LogoutButton';

const ConsumerView = () => {
 
  return (
    <div>
      <LogoutButton />
      <CurrentScratchers />
    </div>
  )
}

export default ConsumerView