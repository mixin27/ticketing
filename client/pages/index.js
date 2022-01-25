const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <div>You are signed in</div>
  ) : (
    <div>You are not signed in</div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  return {};
};

export default LandingPage;
