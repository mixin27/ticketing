import express, { Request, Response } from 'express';
import {
  NotAuthorizedError,
  NotfoundError,
  OrderStatus,
  requireAuth,
} from '@xintickets/common';

import { Order } from '../models/order';

const router = express.Router();

router.delete(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) throw new NotfoundError();
    if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();

    order.status = OrderStatus.Cancelled;
    await order.save();

    // todo: publishing an order cancelled event

    res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
