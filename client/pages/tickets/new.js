import { useState } from 'react';
import Router from 'next/router';

import useRequest from '../../hook/useRequest';

const NewTickeT = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/tickets',
    method: 'post',
    body: {
      title,
      price,
    },
    onSuccess: () => Router.push('/'),
  });

  const onBlur = () => {
    const value = parseFloat(price);
    if (isNaN(value)) return;
    setPrice(value.toFixed(2));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    doRequest();
  };

  return (
    <div>
      <h1>Create a Ticket</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label>Title</label>
          <input
            className="form-control"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group my-2">
          <label>Price</label>
          <input
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            onBlur={onBlur}
          />
        </div>

        {errors}

        <button className="btn btn-primary my-2">Submit</button>
      </form>
    </div>
  );
};

export default NewTickeT;
