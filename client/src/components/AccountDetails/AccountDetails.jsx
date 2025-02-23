import React from "react";
import styles from './AccountDetails.css';

const AccountDetails = ({ credits, account }) => {
  return (
    <div className={styles.main}>
      <div className={styles.detailsContainer}>
        <p className={styles.details}>Credits: {credits}</p>
      </div>
      <div className={styles.detailsContainer}>
        <p className={styles.details}>Account: {account}</p>
      </div>
    </div>
  );
};

export default AccountDetails;
