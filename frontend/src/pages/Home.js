import React, { useState, useEffect } from 'react';
import Axios from "axios";
import CreateScratcher from '../components/CreateScratcher';

const Home = () => {
  const [scratchers, setScratchers] = useState("");
 

  const getScratchers = async () => {
    try {
        const data = await Axios.get(
        `http://localhost:3001/api/scratchers`
      );
      setScratchers(data.data);
      console.log(data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getScratchers();
  }, []);

  return (
    <div>
      <CreateScratcher />
      <h2>Current Scratchers</h2>
      { 
        scratchers !== "" &&
        scratchers.map(scratcher => 
          <div key={scratcher.item_name}>
            {scratcher.item_name}
          </div>
        )
      }
    </div>
  )
}

export default Home