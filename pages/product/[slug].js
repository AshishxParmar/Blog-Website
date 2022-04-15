import React, { useContext } from 'react';
import axios from 'axios';

import Layout from '../../components/Layout';
import NextLink from 'next/link';
import {
  Link,
  Button,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
} from '@material-ui/core';
import Image from 'next/image';
import db from '../../utils/db';
import Product from '../../models/Product';
import { Store } from '../../utils/Stores';
import { useRouter } from 'next/router';

export default function ProductScreen(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { product } = props;

  if (!product) {
    return (
      <div>
        <center>
          <h2>Product not found</h2>
        </center>
      </div>
    );
  }

  const addToCart = async () => {
    console.log('slug wala console');
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    console.log(quantity);
    console.log(product._id);
    const { data } = await axios.get(`/api/products/${product._id}`);
    console.log('data', data);
    if (data.countInStock < quantity) {
      console.log('data.countInStock', data.countInStock);
      window.alert('Sorry, Product OUT OF STOCK');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  return (
    <Layout title={product.name}>
      <NextLink href="/" passHref>
        <Link>
          {' '}
          <Button color="primary"> Back </Button>
        </Link>
      </NextLink>
      <Grid container spacing={1}>
        <Grid item md={5} xs={12}>
          <Image
            src={product.image}
            alt={product.iamge}
            width={640}
            height={600}
            layout="responsive"
          ></Image>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography variant="h4">{product.name}</Typography>{' '}
            </ListItem>
            <ListItem>
              <Typography>Category: {product.category}</Typography>{' '}
            </ListItem>
            <ListItem>
              <Typography>Brand: {product.brand}</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                {' '}
                Rating: {product.rating} stars ({product.numReviews}) reviews
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Descriptions:{product.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {product.countInStock > 0 ? 'InStock' : 'Out of Stock'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  onClick={() => addToCart()}
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Add to Cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}
