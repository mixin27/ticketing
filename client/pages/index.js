import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <div>You are signed in</div>
  ) : (
    <div>You are not signed in</div>
  );
};

LandingPage.getInitialProps = async ({ req }) => {
  const client = buildClient({ req });
  const { data } = await client.get('/api/users/currentuser');
  return data;
};

export default LandingPage;
