import { Router } from 'express';
import { SlotsController } from '../controllers';

export const SlotsRouter = Router();

SlotsRouter.get('/start', SlotsController.start);

SlotsRouter.post('/play', SlotsController.play);

SlotsRouter.post('/cashout', SlotsController.cashout);
