import React, { useState } from 'react';
import AxiosInstance from "../AxiosInstance";
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const LoginAdmin = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const loginUser = { username, password };
      const loginRes = await AxiosInstance.post(
        "/users/adminlogin", 
        loginUser
      );
      localStorage.setItem("auth-token", loginRes.data.token);
      localStorage.setItem("user", loginRes.data.user);
      localStorage.setItem("admin", loginRes.data.admin);
      history.push("/admin");
    } catch (err) {
        console.log(err);
    }
  }

  return (
    <div>
      <h1>Welcome to ScratchBling!</h1>
      <br />
      <h2>Admin Login</h2>
      <form onSubmit={submit}>
        <input type="username" placeholder="Username"
        onChange={e => setUsername(e.target.value)} />
        <br /><br />
        <input type="password" placeholder="Password"
        onChange={e => setPassword(e.target.value)}/>
        <br /><br />
        <input type="submit" value="Submit" />
      </form>
      <br />
      <Link to="/login">Go to Consumer Login</Link>
    </div>
  )
}

export default LoginAdmin