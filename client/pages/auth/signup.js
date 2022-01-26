import { useState } from 'react';
import Router from 'next/router';

import useRequest from '../../hook/useRequest';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push('/'),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await doRequest();
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className="form-group my-2">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {errors}

        <button className="btn btn-primary my-2">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
