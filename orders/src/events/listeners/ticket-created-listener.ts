import { Message } from 'node-nats-streaming';
import { Listener, Subjects, TicketCreatedEvent } from '@xintickets/common';

import { Ticket } from '../../models/ticket';
import { queueGroupName } from './queue-group-name';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(
    data: TicketCreatedEvent['data'],
    msg: Message
  ): Promise<void> {
    const { id, title, price } = data;

    const ticket = Ticket.build({ id, title, price });
    await ticket.save();

    // require*
    msg.ack();
  }
}
