import React from 'react';

const UserContext = React.createContext();

function UserProvider({ children, value }) {
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error();
  }

  return context;
}

export { UserProvider, useUser };
