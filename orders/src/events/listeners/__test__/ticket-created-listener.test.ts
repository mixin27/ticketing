import mongoose from 'mongoose';
import { TicketCreatedListener } from '../ticket-created-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { TicketCreatedEvent } from '@xintickets/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../../models/ticket';

const setup = async () => {
  // Create an instance of listener
  const listener = new TicketCreatedListener(natsWrapper.client);

  // Create a fake data event
  const data: TicketCreatedEvent['data'] = {
    version: 0,
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 30,
    userId: new mongoose.Types.ObjectId().toHexString(),
  };

  // Create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it('should create and save ticket', async () => {
  const { listener, data, msg } = await setup();

  // Call onMessage function with the data object + message object
  await listener.onMessage(data, msg);

  // Write assertion to make sure a ticket was created
  const ticket = await Ticket.findById(data.id);

  expect(ticket).toBeDefined();
  expect(ticket!.title).toEqual(data.title);
  expect(ticket!.price).toEqual(data.price);
});

it('should ack message', async () => {
  const { listener, data, msg } = await setup();

  // Call onMessage function with the data object + message object
  await listener.onMessage(data, msg);

  // Write assertion to make sure a ask function is called
  expect(msg.ack).toHaveBeenCalled();
});
