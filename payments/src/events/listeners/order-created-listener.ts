import {
  Listener,
  OrderCreatedEvent,
  OrderStatus,
  Subjects,
} from '@xintickets/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';

import { Order } from '../../models/order';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(
    data: OrderCreatedEvent['data'],
    msg: Message
  ): Promise<void> {
    const order = Order.build({
      id: data.id,
      version: data.version,
      price: data.ticket.price,
      userId: data.userId,
      status: data.status,
    });
    await order.save();

    msg.ack();
  }
}
