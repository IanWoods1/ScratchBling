import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Axios from "axios";

const CurrentScratchers = () => {
  const [scratchers, setScratchers] = useState("");

  useEffect(() => {
    const getScratchers = async () => {
      try {
          const data = await Axios.get(
          `http://localhost:3001/api/scratchers`,
          {headers: {"x-auth-token": localStorage.getItem("auth-token")}}
        );
        setScratchers(data.data);
      } catch (err) {
        console.log(err);
      }
    }
    getScratchers();
  }, []);

  return (
    <div>
      <h2>Current Scratchers</h2>
      <p>Click on scratcher to see details.</p>
      { 
        scratchers !== "" &&
        scratchers.map(scratcher =>
          <div key={scratcher.item_name}>
            <Link  to={{
              pathname: "/scratcher-details",
              state: {
                scratcherData: scratcher
              }
            }}>
              {scratcher.item_name}
            </Link>
          </div>
        )
      }
    </div>
  )
}

export default CurrentScratchers