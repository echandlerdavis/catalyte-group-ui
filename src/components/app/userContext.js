import React from 'react';

const UserContext = React.createContext();

function UserProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const value = { user, setUser };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('UserContext is not defined');
  }

  return context;
}

export { UserProvider, useUser };
