import React from "react";
import { useEffect } from "react";
import SlotMachine from 'components/SlotMachine/SlotMachine';
import SlotActions from 'components/SlotActions/SlotActions';
import AccountDetails from "components/AccountDetails/AccountDetails";
import Alerts from 'components/Alerts/Alerts';
import { useAppContext } from 'contexts/AppContext/AppContext';
import { ApiService } from 'api/ApiService';
import styles from './App.css';

const App = () => {
  const { setCredits, setAccount, setGameStarted, setTwist, setMessage } = useAppContext();
  useEffect(() => {
    const startSession = async () => {
      try {
        const response = await ApiService.start();
        if (response.status === 200) {
          setAccount(response?.game?.account || 0);
          setCredits(response?.game?.credits || 0);
          setTwist(response?.game?.isTwistAllowed);
          setGameStarted(true);
        }
      } catch (e) {
        setMessage({
          type: 'error',
          msg: 'Failed to start session!',
        });
      }
    };

    startSession();
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.main}>
        <h1 className={styles.header}>Slot Machine</h1>
        <SlotMachine />
        <AccountDetails />
        <SlotActions />
        <Alerts />
      </div>
    </div>
  );
};

export default App;
