import { Router } from 'express';
import { SlotsController } from '../controllers';

export const SlotsRouter = Router();

SlotsRouter.post(
  '/play',
  SlotsController.play
);
