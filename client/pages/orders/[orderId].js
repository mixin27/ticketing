import { useEffect, useState } from 'react';
import Router from 'next/router';
import StripeCheckout from 'react-stripe-checkout';

import useRequest from '../../hook/useRequest';

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id,
    },
    onSuccess: (_) => Router.push('/orders'),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msleft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msleft / 1000));
    };

    findTimeLeft();
    const timer = setInterval(findTimeLeft, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [order]);

  if (timeLeft < 0) return <div>Order expired!</div>;

  return (
    <div>
      <p className="my-2">
        Time left to pay: <span className="text-danger">{timeLeft}</span>{' '}
        seconds
      </p>
      <div className="my-4">
        <StripeCheckout
          token={({ id }) => doRequest({ token: id })}
          stripeKey="pk_test_51IysjXGuFTCxSSwSfV4rHuBrPfbhqDIXdbZwxADpsreh7HIp9yOvqQsaGYcOqdtqG4LkRarUhwDZ7QfK12ryJ60J00IXYroF9Z"
          amount={order.ticket.price * 100}
          email={currentUser.email}
        />
      </div>
      <div className="my-2">{errors}</div>
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);
  return { order: data };
};

export default OrderShow;
