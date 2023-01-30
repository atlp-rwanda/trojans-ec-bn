import express from 'express';

const home = express.Router();

home.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to our homepage' });
});

export default home;