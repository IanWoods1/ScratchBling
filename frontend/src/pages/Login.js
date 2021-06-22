import React, {useState, useContext} from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const loginUser = { username, password };
      const loginRes = await Axios.post(
        "http://localhost:3001/api/users/login", 
        loginUser
      );
      localStorage.setItem("auth-token", loginRes.data.token);
      localStorage.setItem("user", loginRes.data.user);
      history.push("/");
    } catch (err) {
        console.log(err);
    }
  }

  return (
    <div className="login-form">
      <h2>Log in</h2>
      <form onSubmit={submit}>
        <input type="username" placeholder="Username"
        onChange={e => setUsername(e.target.value)} />
        <br /><br />
        <input type="password" placeholder="Password"
        onChange={e => setPassword(e.target.value)}/>
        <br /><br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default Login