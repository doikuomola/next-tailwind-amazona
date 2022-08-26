import { useContext } from 'react';
import { Layout, ProductItem } from '../components';
import Product from '../models/Product';
import db from '../utils/db';
import { Store } from '../utils/Store';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);
  // const { cart } = state;

  const addToCartHandler = async (product) => {
    const itemExists = state.cart.cartItems.find(
      (x) => x.slug === product.slug
    );
    const quantity = itemExists ? itemExists.quantity + 1 : 1;

    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countsInStock < quantity) {
      return toast.error('Sorry, Product is out of stock');
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity: quantity },
    });
    toast.success('Product added to the cart');
  };

  return (
    <Layout title="homepage">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          />
        ))}
      </div>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  await db.connect();
  const products = await Product.find().lean();
  await db.disconnect();

  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
};
