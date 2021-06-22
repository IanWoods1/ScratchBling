import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';

const ScratcherDetails = (props) => {
  const history = useHistory();
  const [details, setDetails] = useState(props.routerProps.location.state.scratcherData);

  //Create string listing scratcher sizes.
  var sizeString = "";
  details.item_size.slice().reverse().forEach(
    (size) => sizeString += (size + ", ")
  );
  sizeString = sizeString.slice(0, -2);

  return (
    <div>
      <h3>{details.item_name}</h3>
      <p>{details.item_description}</p>
      <p>Sizes: {sizeString}</p>
      <p>${details.item_cost}</p>
      {
        localStorage.getItem("user") === "admin" ?
        <div>
          <button onClick={() => history.push("/admin")}>Return Admin View</button>
          <br /><br />
          <button onClick={() => history.push("/")}>Return Consumer View</button>
        </div> :
        <button onClick={() => history.push("/")}>Return home</button>
      }
    </div>

  )
}

export default ScratcherDetails