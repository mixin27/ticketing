import { Message } from 'node-nats-streaming';
import { Listener } from './base-listener';
import { TicketCreatedEvent } from './ticket-created-event';
import { Subjects } from './subjects';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = 'payment-service';

  onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
    console.log('Event data!', data);

    // need to call if setManualAckMode to `true`
    msg.ack();
  }
}
