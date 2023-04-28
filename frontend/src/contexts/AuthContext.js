import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);
const useAuth = () =>{
  return useContext(AuthContext);
}
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const fetchVerify = async () => {
      const response = await fetch("https://metaschool-web.onrender.com/verify", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: 'include', mode: 'no-cors',
      }).then(data => {
        if(data.status === 200) setIsAuthenticated(true)
        else setIsAuthenticated(false)
      });
    }
    fetchVerify();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext, useAuth };
