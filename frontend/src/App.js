import React, { useEffect } from "react";
import Axios from 'axios';
import './App.css';
import AdminView from './pages/AdminView';
import ConsumerView from './pages/ConsumerView';
import Login from './pages/Login';
import LoginAdmin from './pages/LoginAdmin';
import ScratcherDetails from './components/ScratcherDetails'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
// import UserContext from "./UserContext";

function App() {

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:3001/api/users/tokenIsValid", 
        null, 
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:3001/api/users/", { headers: {"x-auth-token": token }
        });
        localStorage.setItem("user", userRes.data.user);
        localStorage.setItem("admin", userRes.data.admin);
      }
    }

    checkLoggedIn();
  }, []);

  console.log(localStorage.getItem("auth-token"));

  return (
    <div className="App">
      <Router>
        {/* <UserContext.Provider 
          value={{ userData, setUserData }}
        > */}
          <Route path="/" exact 
            render={() => localStorage.getItem("auth-token") ? 
            (<ConsumerView />) : (<Redirect to="/login" />)}>
          </Route>
          <Route path="/admin" exact 
            render={() => localStorage.getItem("admin") === "true" ? 
            (<AdminView />) : (<Redirect to="/" />)}>
          </Route>
          <Route path="/login" 
              render={() => !localStorage.getItem("user") ? (<Login />) : (<Redirect to="/" />)}>
          </Route>
          <Route path="/adminlogin"
              render={() => !localStorage.getItem("user") ? (<LoginAdmin />) : (<Redirect to="/admin" />)}>
          </Route>
          <Route path="/scratcher-details"
            render={(routerProps) => localStorage.getItem("user") ? (<ScratcherDetails routerProps={routerProps}/>) : (<Redirect to="/login" />)}>
          </Route>
        {/* </UserContext.Provider> */}
      </Router>
    </div>
  );
}

export default App;
