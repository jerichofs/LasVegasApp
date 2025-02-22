import React from "react";
import { useMemo, useState, createContext, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isSpinning, setSpinning] = useState(false);
  const [spins, setSpins] = useState([false, false, false]);
  const [reels, setReels] = useState([]);

  const contextValue = useMemo(
    () => ({
      isSpinning,
      setSpinning,
      spins,
      setSpins,
      reels,
      setReels,
    }),
    [
      isSpinning,
      spins,
      setSpinning,
      setSpins,
      reels,
      setReels,
    ],
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
