import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';


const AdminButton = () => {

  const history = useHistory();

  return (
    <>
      <div>
        <button onClick={() => history.push("/admin")}>Admin View</button>
      </div>
    </>
  )
}

export default AdminButton