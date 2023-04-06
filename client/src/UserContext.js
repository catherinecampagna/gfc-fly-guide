import React, { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    email: null,
    name: null,
    favoriteFlies: [],
    reviews: [],
    ratings: [],
  });

  const { isAuthenticated, user, isLoading } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`/user/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setCurrentUser(data);
        });
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
