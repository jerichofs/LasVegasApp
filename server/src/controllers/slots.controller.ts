import { Request, Response } from 'express';
import { SlotsService } from '../services';

class Slots {
  private slotsService: SlotsService;
  constructor(slotsInstanceService: SlotsService) {
    this.slotsService = slotsInstanceService;
  }

  start = async (req: Request, res: Response) => {
    try {
      req.session.game = { credits: 10, account: 0, isTwistAllowed: true };
      return res.status(200).json({
        status: 200,
        game: req.session.game,
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        message: e?.message || 'Something went wrong',
      });
    }
  };

  play = async (req: Request, res: Response) => {
    try {
      // validate session
      if (!req.session.game) {
        return res.status(400).json({
          status: 400,
          message: 'No active game session',
        });
      }
      const game = req.session.game;

      if (game.credits <= 0) {
        return res.status(400).json({
          status: 400,
          message: 'Insufficient amount of credits to play',
        });
      }

      // deduct the cost
      game.credits -= 1;

      // spin slots
      let slots = this.slotsService.spin();
      let isWinning = this.slotsService.isWin(slots);

      const cheatChance = this.slotsService.cheat(isWinning, game.credits);

      // re-roll if we cheat
      if (cheatChance > Math.random()) {
        slots = this.slotsService.spin();
        isWinning = this.slotsService.isWin(slots);
      }

      // get reward in case of win
      let reward: number = 0;
      if (isWinning) {
        const slot = slots[0];
        reward = this.slotsService.rewards[slot] || 0;
        game.credits += reward;
      }

      return res.status(200).json({
        status: 200,
        slots,
        isWinning,
        reward,
        credits: game.credits,
        account: game.account,
        isTwistAllowed: game.isTwistAllowed,
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        message: e?.message || 'Something went wrong',
      });
    }
  };

  cashout = async (req: Request, res: Response) => {
    try {
      if (!req.session.game) {
        return res.status(400).json({
          status: 400,
          message: 'No active game session',
        });
      }

      const game = req.session.game;

      // Move credits to account
      game.account = (game.account || 0) + game.credits;
      // destroy the session to end the game
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({
            status: 500,
            message: 'Cash-out failed',
          });
        }
        return res.status(200).json({
          status: 200,
          credits: 0,
          account: game.account,
          isTwistAllowed: false,
        });
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        message: e?.message || 'Something went wrong',
      });
    }
  };

  twist = async (req: Request, res: Response) => {
    try {
      if (!req.session.game) {
        return res.status(400).json({
          status: 400,
          message: 'No active game session',
        });
      }
      if (!req.session.game.isTwistAllowed) {
        return res.status(400).json({
          status: 400,
          message: 'You can make twist only once per game session',
        });
      }
      if (!req.session.game.credits) {
        return res.status(400).json({
          status: 400,
          message: 'Insufficient amount of credits to twist',
        });
      }
      req.session.game.isTwistAllowed = false;

      const game = req.session.game;
      const twist = this.slotsService.twist(game.credits);
      req.session.game.credits = twist.credits;

      if (twist.isSuccess) {
        return res.status(200).json({
          status: 200,
          type: 'success',
          credits: twist.credits,
          account: game.account,
          isTwistAllowed: false,
          message: 'Congratulations! You doubled your credits!',
        });
      }

      return res.status(200).json({
        status: 200,
        type: 'error',
        credits: twist.credits,
        account: game.account,
        isTwistAllowed: false,
        message: 'You are out of luck, loose credits in half (:',
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        message: e?.message || 'Something went wrong',
      });
    }
  };
}

export const SlotsController = new Slots(new SlotsService());
