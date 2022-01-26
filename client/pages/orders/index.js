const OrderIndex = ({ orders }) => {
  const orderList = orders.map((order) => {
    return (
      <tr key={order.id}>
        <td>{order.ticket.title}</td>
        <td>{order.ticket.price}</td>
        <td>{order.status}</td>
      </tr>
    );
  });

  return (
    <div>
      <h1>My Orders</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{orderList}</tbody>
      </table>
    </div>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders');
  return { orders: data };
};

export default OrderIndex;
