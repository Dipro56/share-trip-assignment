// import { Box, Flex, Select, Text, Grid } from '@radix-ui/themes';
// import ProductCard from '@/components/products/ProductCard';
// import productService from '@/services/productService';

import ProductCard from '@/components/product/ProductCard';
import productService from '@/services/productService';

// import ProductSkeleton from '@/components/skeleton/ProductSkeleton';

async function getProducts() {
  let res = await productService.getAllProduct();
  if (res?.products.length > 0) {
    return res?.products;
  } else {
    return { products: [] };
  }
}

const home = async () => {
  let productList = await getProducts();
  return (
    <main className="mx-6 md:mx-12 lg:mx-24 my-12">
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {productList?.length > 0 &&
          productList?.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
      </div>
    </main>
  );
};

export default home;
