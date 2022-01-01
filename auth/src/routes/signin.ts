import express from 'express';

const router = express.Router();

router.get('/api/users/signin', (req, res) => {
  res.send('Hello signin!');
});

export { router as signinRouter };
