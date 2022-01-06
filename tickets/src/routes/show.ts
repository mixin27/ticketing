import express, { Request, Response } from 'express';
import { NotfoundError } from '@xintickets/common';

import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    throw new NotfoundError();
  }

  res.status(200).send(ticket);
});

export { router as showTicketRouter };
