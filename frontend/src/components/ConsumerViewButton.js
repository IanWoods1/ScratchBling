import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';


const ConsumerViewButton = () => {

  const history = useHistory();

  return (
    <>
      <div>
        <button onClick={() => history.push("/")}>Consumer View</button>
      </div>
    </>
  )
}

export default ConsumerViewButton