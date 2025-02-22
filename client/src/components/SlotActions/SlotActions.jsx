import React from "react";
import { useAppContext } from "contexts/AppContext/AppContext";
import styles from './SlotActions.css';

const SlotActions = () => {
  const {isSpinning, setSpinning, setSpins, spins, reels} = useAppContext();

  const handlePlay = async () => {
    if (isSpinning) return; // prevents re-spinning

    setSpinning(true);
    setSpins([true, true, true]);

    for (let i = 0; i < spins.length; i++) {
      const spinningTime = (i + 1) * 1000;
      setTimeout(() => {
        setSpins((prev) => {
          const newSpins = [...prev];
          newSpins[i] = false;
          return newSpins;
        });
        if (i === spins.length - 1) {
          setSpinning(false);
        }
      }, spinningTime);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.buttonContainer}>
        <button
          className={styles.play}
          onClick={handlePlay}
          disabled={isSpinning}
        >
          Play
        </button>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.play}>Twist</button>
      </div>
    </div>
  );
};

export default SlotActions;
