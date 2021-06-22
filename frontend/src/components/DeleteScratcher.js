import React, {useState} from 'react';
import Axios from 'axios';

const DeleteScratcher = () => {
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    try {

      const data = await Axios.delete(
        `http://localhost:3001/api/scratchers/${name}`,
        {headers: {"x-auth-token": localStorage.getItem("auth-token")}}
      );
      console.log(data.data);
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <div>
      <h2>Delete Scratcher</h2>
      <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input type="text" name="name" value={name} required
        onChange={e => setName(e.target.value)}/>
      <br /><br />
      <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default DeleteScratcher
