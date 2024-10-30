import { baseUrl } from '@/utils/configure';
const productService = {};

productService.getAllProduct = async () => {
  try {
    let url = `${baseUrl}/products`;

    let response = await fetch(url)
      .then((response) => response.json())
      .catch((error) => error);
    return response;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
};

productService.singleProductDetails = async (id) => {
  try {
    let url = `${baseUrl}/products/${id}`;
    console.log(url);
    let response = await fetch(url)
      .then((response) => response.json())
      .catch((error) => error);
    return response;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default productService;
