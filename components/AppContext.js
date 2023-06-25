import { createContext, useContext, useState } from 'react';

// Create the context
const AppContext = createContext();

// Custom hook to access the context values
export const useAppContext = () => useContext(AppContext);

// Context provider component
export const AppContextProvider = ({ children }) => {
  const [sharedState, setSharedState] = useState({
    menu: false,
  });

  return (
    <AppContext.Provider value={{ sharedState, setSharedState }}>
      {children}
    </AppContext.Provider>
  );
};