import React from "react";
import { useAppContext } from "contexts/AppContext/AppContext";
import styles from './AccountDetails.css';

const AccountDetails = () => {
  const {isSpinning, setSpinning, setSpins, spins, reels} = useAppContext();

  return (
    <div className={styles.main}>
      <p className={styles.details}>Credits: 10</p>
    </div>
  );
};

export default AccountDetails;
