//This component is not currently being used. 
import React,  {useState, useEffect, createContext} from 'react';
import AxiosInstance from "../AxiosInstance";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  // useState React hook
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await AxiosInstance.post(
        "/users/tokenIsValid", 
        null, 
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await AxiosInstance.get("/users/", { headers: {"x-auth-token": token }
        });
        localStorage.setItem("user", userRes.data.user);
        localStorage.setItem("admin", userRes.data.admin);
        setUserData({
          token,
          user: userRes.data.user
        });
      }
    }

    checkLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {props.children}
    </AuthContext.Provider>  
  )
}

export default AuthContext;
export {AuthContextProvider};

