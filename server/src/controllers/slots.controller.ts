import { Request, Response } from 'express';
import { SlotsService } from '../services';

class Slots {
  private slotsService: SlotsService;
  constructor(slotsInstanceService: SlotsService) {
    this.slotsService = slotsInstanceService;
  }

  start = async (req: Request, res: Response) => {
    req.session.game = { credits: 10, account: 0 };
    return res.status(200).json({
      status: 200,
      game: req.session.game,
    });
  };

  play = async (req: Request, res: Response) => {
    try {
      // validate session
      if (!req.session.game) {
        return res.status(400).json({
          status: 400,
          error: 'No active game session',
        });
      }
      const game = req.session.game;

      if (game.credits <= 0) {
        return res.status(400).json({
          status: 400,
          error: 'Insufficient amount of credits to play',
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
        slots,
        isWinning,
        credits: game.credits,
        account: game.account,
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        error: e?.message || 'Something went wrong',
      });
    }
  };

  cashout = async (req: Request, res: Response) => {
    if (!req.session.game) {
      return res.status(400).json({
        status: 400,
        error: 'No active game session',
      });
    }

    const game = req.session.game;
    const cashOutCredits = game.credits;

    // Move credits to account
    game.account = (game.account || 0) + cashOutCredits;
    // destroy the session to end the game
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: 'Cash-out failed',
        });
      }
      return res.status(200).json({
        status: 200,
        cashedOutCredits: cashOutCredits,
        account: game.account,
      });
    });
  };
}

export const SlotsController = new Slots(new SlotsService());
