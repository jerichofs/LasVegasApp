import { Request, Response } from 'express';

class Slots {
  constructor() {}

  play = async (req: Request, res: Response): Promise<any> => {
    try {
      return res.status(200).json({
        status: 200,
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        error: e?.message || 'Something went wrong',
      });
    }
  }
}

export const SlotsController = new Slots();
