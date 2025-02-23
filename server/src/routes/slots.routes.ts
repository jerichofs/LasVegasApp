import { Router } from 'express';
import { SlotsController } from '../controllers';

export const SlotsRouter = Router();

SlotsRouter.post('/start', SlotsController.start);

SlotsRouter.post('/play', SlotsController.play);

SlotsRouter.post('/cashout', SlotsController.cashout);

SlotsRouter.post('/twist', SlotsController.twist);
