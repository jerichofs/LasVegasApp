import React from 'react';
import { useAppContext } from 'contexts/AppContext/AppContext';
import { ApiService } from 'api/ApiService';
import styles from './SlotActions.css';

const SlotActions = () => {
  const {
    isSpinning,
    setSpinning,
    setWinning,
    credits,
    setCredits,
    setAccount,
    setSlots,
    setSpins,
    spins,
    isGameStarted,
    setGameStarted,
    isTwistAllowed,
    setTwist,
    setMessage,
  } = useAppContext();

  const handlePlay = async () => {
    try {
      if (isSpinning) return; // prevents re-spinning

      if (!credits) {
        setMessage({
          type: 'error',
          msg: 'Insufficient amount of credits to play',
        });
        return;
      }

      setSpinning(true);
      setSpins([true, true, true]);

      // play game
      const response = await ApiService.play();
      // make error
      if (response.status !== 200) {
        setSpinning(false);
        setSpins([false, false, false]);
        const message = response.message || 'Failed to make a roll!';
        setMessage({
          type: 'error',
          msg: message,
        });
        return;
      }
      setSlots(response.slots);

      for (let i = 0; i < spins.length; i++) {
        const spinningTime = (i + 1) * 1000;
        setTimeout(() => {
          setSpins((prev) => {
            const newSpins = [...prev];
            newSpins[i] = false;
            return newSpins;
          });
          if (i === spins.length - 1) {
            setCredits(response.credits);
            setAccount(response.account);
            setWinning(response.isWinning);
            setSpinning(false);
            if (response.isWinning) {
              setMessage({
                type: 'success',
                msg: `Congratulations! You won ${response.reward} credits!`
              });
            } else {
              setMessage({
                type: 'error',
                msg: 'You lose the roll (:'
              });
            }
          }
        }, spinningTime);
      }
    } catch (error) {
      setSpinning(false);
      setSpins([false, false, false]);
      setMessage({
        type: 'error',
        msg: 'Failed API to make a roll!'
      });
    }
  };

  const handleCashOut = async () => {
    try {
      const response = await ApiService.cashout();
      if (response.status === 200) {
        setAccount(response?.account);
        setCredits(response?.credits);
        setGameStarted(false);
        setMessage({
          type: 'success',
          msg: 'Cashed out Credits!'
        });
        return;
      }
      const message = response.message || 'Failed to make a cash out!';
      setMessage({
        type: 'error',
        msg: message,
      });
    } catch (error) {
      setMessage({
        type: 'error',
        msg: 'Failed to cash out!',
      });
    }
  };

  const handleTwist = async () => {
    try {
      const response = await ApiService.twist();
      const message = response.message || 'Failed to twist!';
      if (response.status !== 200) {
        setMessage({
          type: 'error',
          msg: message,
        });
        return;
      }
      setTwist(false);
      setCredits(response?.credits);
      setAccount(response?.account);
      setMessage({
        type: response?.type ? response?.type : 'success',
        msg: message,
      });
    } catch (error) {
      setMessage({
        type: 'error',
        msg: 'Failed to twist!',
      });
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.buttonContainer}>
        <button
          className={styles.play}
          onClick={handlePlay}
          disabled={!(isGameStarted && !isSpinning)}
        >
          Play
        </button>
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={styles.play}
          onClick={handleCashOut}
          disabled={!(isGameStarted && !isSpinning)}
        >
          Cash Out
        </button>
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={styles.play}
          disabled={!(isGameStarted && !isSpinning) || !isTwistAllowed}
          onClick={handleTwist}
        >
          Twist
        </button>
      </div>
    </div>
  );
};

export default SlotActions;
