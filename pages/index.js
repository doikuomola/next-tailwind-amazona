import { Layout, ProductItem } from '../components';
import data from '../utils/data';

export default function Home() {
  return (
    <Layout title="homepage">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product) => (
          <ProductItem product={product} key={product.slug} />
        ))}
      </div>
    </Layout>
  );
}
