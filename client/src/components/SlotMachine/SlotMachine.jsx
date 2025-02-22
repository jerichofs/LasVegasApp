import React from "react";
import { useAppContext } from "contexts/AppContext/AppContext";
import styles from './SlotMachine.css';

const SlotMachine = () => {
  const {isSpinning, setSpinning, setSpins, spins, reels} = useAppContext();

  return (
    <div className={styles.main}>
      <table>
        <tbody>
        <tr className={styles.row}>
          {spins.map((item, index) => (
            <td
              key={index}
              className={styles.slotContainer}
            >
              <div
                className={styles.slot}
              >
                <div className={spins[index] ? styles.spinning : styles.reel}>
                  {spins[index] ? 'X' : reels[index] || 'X' }
                </div>
              </div>
            </td>
          ))}
        </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SlotMachine;
