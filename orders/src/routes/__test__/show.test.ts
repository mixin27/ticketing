import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

it('should fetch the order', async () => {
  // Create a ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 45,
  });
  await ticket.save();

  const user = global.signin();

  // Make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({
      ticketId: ticket.id,
    })
    .expect(201);

  // Make a request to fetch the order
  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(200);

  expect(fetchedOrder.id).toEqual(order.id);
});

it('should return errors if one user tries to fetch another user orders', async () => {
  // Create a ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 45,
  });
  await ticket.save();

  const user = global.signin();

  // Make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({
      ticketId: ticket.id,
    })
    .expect(201);

  // Make a request to fetch the order
  await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', global.signin())
    .send()
    .expect(401);
});
