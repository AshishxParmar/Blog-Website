import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';
const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  res.send(products);
});

// handler.post(async (req, res) => {
//   await db.connect();
//   const newProduct = new Product({
//     name: req.body.name,
//     slug: req.body.slug,
//     category: req.body.category,
//     image: req.body.image,
//     price: req.body.price,
//     brand: req.body.brand,
//     description: req.body.description,
//   });
//   const user = await newProduct.save();
//   await db.disconnect();

//   // const token = signToken(user);
//   res.send({
//     // token,
//     // _id: user._id,
//     // name: user.name,
//     // email: user.email,
//     // isAdmin: user.isAdmin,
//   });
// });

handler.post(async (req, res) => {
  await db.connect();

  const {
    name,
    price,
    description,
    image,
    slug,
    category,
    brand,
    countInStock,
  } = req.body;
  try {
    // if (
    //   !name ||
    //   !price ||
    //   !description ||
    //   !image ||
    //   !slug ||
    //   !brand ||
    //   !category
    // ) {
    //   return res.status(422).json({ error: 'Please add all the fields' });
    // }
    const product = await new Product({
      name,
      price,
      description,
      image,
      slug,
      category,
      countInStock,
      brand,
    }).save();
    await db.disconnect();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: 'internal server error' });
    console.log(err);
  }
});

export default handler;
