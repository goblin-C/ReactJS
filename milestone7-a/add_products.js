import axios from 'axios';

const API_URL = "https://api.escuelajs.co/api/v1/products/";
const CATEGORY_ID = 5; // Change if needed

const getRandomImage = () => `https://picsum.photos/seed/${Math.floor(Math.random() * 10000)}/600/400`;

const generateProduct = (index) => ({
  title: `Product ${index + 1}`,
  price: Math.floor(Math.random() * 100) + 1,
  description: `Description for product ${index + 1}`,
  categoryId: CATEGORY_ID,
  images: [getRandomImage()]
});

const createProducts = async () => {
  for (let i = 0; i < 30; i++) {
    const product = generateProduct(i);
    try {
      const res = await axios.post(API_URL, product);
      console.log(`✅ Created: ${res.data.title} (ID: ${res.data.id})`);
    } catch (error) {
      console.error(`❌ Error creating product ${i + 1}:`, error.response?.data || error.message);
    }
  }
};

createProducts();
