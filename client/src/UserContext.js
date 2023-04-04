import React, { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: null,
    name: null,
    favoriteFlies: [],
    reviews: [],
    ratings: [],
  });

  const { isAuthenticated, user: auth0User, isLoading } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      const { email, name } = auth0User;
      setUser((prevUser) => ({ ...prevUser, email, name }));
    }
  }, [isAuthenticated, auth0User]);

  const updateUser = (data) => {
    setUser({ ...user, ...data });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
