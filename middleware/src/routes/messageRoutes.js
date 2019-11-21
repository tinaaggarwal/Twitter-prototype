/* eslint-disable no-console */
import express from 'express';

const kafka = require('../../kafka/client');

const messageRouter = express.Router();

messageRouter.post('/compose', (req, res) => {
  console.log('Inside POST  Messages');
  console.log('Request Body: ', req.body);
  kafka.makeRequest(
    'messageTopic',
    {
      body: req.body,
      action: 'MESSAGE_COMPOSE',
    },
    (err, result) => {
      if (err) {
        console.log('Error ', err);
        res.status(500).json({
          message: err.message,
        });
      } else {
        res.status(200).json(result);
      }
    }
  );
});

export default messageRouter;
