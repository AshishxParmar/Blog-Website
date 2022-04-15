import nc from 'next-connect';
import Order from '../../../models/Order';

import { isAuth } from '../../../utils/auth';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
  onError,
});
handler.use(isAuth);

handler.post(async (req, res) => {
  await db.connect();
  const newOrder = new Order({
    ...req.body,
    user: req.user._id,
  });
  const order = await newOrder.save();
  res.status(201).send(order);
});

handler.get(async (req, res) => {
  await db.connect();
  const orders = await Order.find({});
  // .populate('user','name');
  await db.disconnect();
  res.send(orders);
});
export default handler;
