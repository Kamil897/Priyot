import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ points: 5000 });

  const spendPoints = (amount) => {
    if (user.points >= amount) {
      setUser((prevUser) => ({ ...prevUser, points: prevUser.points - amount }));
      return true;
    }
    return false;
  };

  return (
    <UserContext.Provider value={{ user, spendPoints }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
