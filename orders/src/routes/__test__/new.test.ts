import request from 'supertest';
import mongoose from 'mongoose';
import { OrderStatus } from '@xintickets/common';

import { app } from '../../app';
import { Order } from '../../models/order';
import { Ticket } from '../../models/ticket';

// it('should', async () => {});

it('should return an error if the ticket does not exist', async () => {
  const ticketId = new mongoose.Types.ObjectId();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId })
    .expect(404);
});

it('should eturn an error if the ticket is already reserved', async () => {
  const ticket = Ticket.build({
    title: 'Concert',
    price: 20,
  });
  await ticket.save();

  const order = Order.build({
    ticket,
    userId: 'asdflala',
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });
  await order.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId: ticket.id })
    .expect(400);
});

it('should reserve a ticket', async () => {
  const ticket = Ticket.build({
    title: 'Concert',
    price: 20,
  });
  await ticket.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId: ticket.id })
    .expect(201);
});

it.todo('emit an order created event');
