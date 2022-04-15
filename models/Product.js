import Mongoose from 'mongoose';
const productSchema = new Mongoose.Schema(
  {
    name: { type: String },
    slug: { type: String, unique: true },
    category: { type: String },
    image: { type: String },
    price: { type: Number },
    brand: { type: String },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    countInStock: { type: Number, default: 0 },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

const Product =
  Mongoose.models.Product || Mongoose.model('Product', productSchema);

export default Product;
