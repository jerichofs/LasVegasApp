import React from "react";
import { useAppContext } from "contexts/AppContext/AppContext";
import styles from './SlotMachine.css';

const SYMBOLS = {
  Cherry: 'C',
  Lemon: 'L',
  Orange: 'O',
  Watermelon: 'W',
};

const SlotMachine = () => {
  const { spins, slots } = useAppContext();

  const getStyleSlot = (index) => {
    if (slots.length) {
      const slot = slots[index];
      return styles[slot];
    }
    return styles.reel;
  };
  const getSymbolSlot = (index) => {
    if (!slots.length) {
      return 'X';
    }
    const slot = slots[index];
    const symbolSlot = SYMBOLS[slot];
    if (symbolSlot) {
      return symbolSlot;
    }
    return 'X';
  };
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
                <div className={spins[index] ? styles.spinning : getStyleSlot(index)}>
                  {spins[index] ? 'X' : getSymbolSlot(index) }
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
