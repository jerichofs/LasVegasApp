import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from "cors";
import session from 'express-session';
import { SlotsRouter } from './routes';

const app: express.Application = express();

app.use(cors({
  origin: process.env.FE_URL || 'http://localhost:3001',
  credentials: true,
}));
app.use(session({
  secret: process.env.SESSION_SECRET || 'session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 Day
  },
}));

const port: number = +process.env.PORT || 3000;
const ip = process.env.IP || 'localhost';

// Routes
app.use('/', SlotsRouter);

app.use((req, res) =>
  res.status(404).json({
    status: 404,
    msg: 'Not found',
  }),
);

app.listen(port, ip, () =>
  // eslint-disable-next-line no-console
  console.log('The server is listening on IP:', ip, ' PORT:', port),
);
