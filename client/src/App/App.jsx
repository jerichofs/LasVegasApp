import React from "react";
import SlotMachine from 'components/SlotMachine/SlotMachine';
import SlotActions from 'components/SlotActions/SlotActions';
import AccountDetails from "components/AccountDetails/AccountDetails";
import styles from './App.css';

const App = () => {
  return (
    <div className={styles.app}>
      <div className={styles.main}>
        <h1>Slot Machine</h1>
        <SlotMachine />
        <AccountDetails />
        <SlotActions />
      </div>
    </div>
  );
};

export default App;
