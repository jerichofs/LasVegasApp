import React from "react";
import { useAppContext } from "contexts/AppContext/AppContext";
import styles from './Alerts.css';

const Alerts = () => {
  const { message, setMessage } = useAppContext();

  // make message disappear after
  if (message?.type) {
    setTimeout(() => {
      setMessage({type: null, msg: '' });
    }, 1000);
  }

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        {message?.type ? (
          <p className={styles[message?.type]}>{message?.msg}</p>
        ) :
          null}
      </div>
    </div>
  );
};

export default Alerts;
