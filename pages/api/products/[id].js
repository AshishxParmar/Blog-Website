import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';
const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  await db.disconnect();
  res.send(product);
});

handler.patch(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);

  (product.name = req.body.name),
    (product.slug = req.body.slug),
    (product.category = req.body.category),
    (product.price = req.body.price),
    (product.brand = req.body.brand),
    (product.rating = req.body.rating),
    (product.numReviews = req.body.numReviews),
    (product.countInStock = req.body.countInStock),
    (product.description = req.body.description),
    await product.save();
  await db.disconnect();
  res.send({
    product,
  });
});

handler.put(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);

  (product.image = req.body.image), await product.save();
  await db.disconnect();
  res.send();
});

export default handler;
