import React from "react";
import { useMemo, useState, createContext, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isSpinning, setSpinning] = useState(false);
  const [spins, setSpins] = useState([false, false, false]);
  const [slots, setSlots] = useState([]);
  const [credits, setCredits] = useState(0);
  const [account, setAccount] = useState(0);
  const [isGameStarted, setGameStarted] = useState(false);
  const [isWinning, setWinning] = useState(false);
  const [isTwistAllowed, setTwist] = useState(true);
  const [message, setMessage] = useState({type: null, msg: '' });

  const contextValue = useMemo(
    () => ({
      isSpinning,
      setSpinning,
      spins,
      setSpins,
      slots,
      setSlots,
      credits,
      setCredits,
      account,
      setAccount,
      isGameStarted,
      setGameStarted,
      isWinning,
      setWinning,
      message,
      setMessage,
      isTwistAllowed,
      setTwist,
    }),
    [
      isSpinning,
      spins,
      setSpinning,
      setSpins,
      slots,
      setSlots,
      credits,
      setCredits,
      account,
      setAccount,
      isGameStarted,
      setGameStarted,
      isWinning,
      setWinning,
      message,
      setMessage,
      isTwistAllowed,
      setTwist,
    ],
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
