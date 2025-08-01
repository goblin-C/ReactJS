# 9. Creating a Product Details Page

Right now, all our products are in a list. Let's create a new page that shows more information about a single product when a user clicks on it. This requires "routing" – showing different pages based on the URL.

## Step 1: Set Up Routing

We'll use `react-router-dom`, a standard library for routing in React.

1.  Make sure it's installed: `npm install react-router-dom`
2.  Open `src/App.tsx` and modify it to handle different routes.

Replace the content of `src/App.tsx` with this:

```tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { HomePage } from './pages/HomePage';
import ProductDetails from './pages/ProductDetails'; // We will create this next
// import Cart from './pages/Cart'; // For later

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            {/* <Route path="/cart" element={<Cart />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
```

**What's new here?**
- We wrap our app in `<Router>`.
- `<Routes>` is where we define our different pages.
- `<Route path="/" ... />` defines the homepage.
- `<Route path="/product/:id" ... />` is a dynamic route. The `:id` part is a placeholder for the product's ID. So, a URL like `/product/1` will render the `ProductDetails` component.

## Step 2: Create the Product Details Page File

1.  Go to the `src/pages/` folder.
2.  Create a new file named `ProductDetails.tsx`.

## Step 3: Build the Product Details Component

Open `src/pages/ProductDetails.tsx` and add the following code:

```tsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchProducts } from '../store/slices/productSlice';
import { RootState } from '../store';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>(); // Get the 'id' from the URL
  const dispatch = useAppDispatch();
  
  // Find the specific product from the Redux store
  const product = useAppSelector((state: RootState) => 
    state.products.items.find(p => p.id === Number(id))
  );
  const productStatus = useAppSelector((state: RootState) => state.products.status);

  // Fetch products if they aren't already in the store
  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  if (!product) {
    return <div className="text-center py-12">Loading product details...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <img src={product.image} alt={product.title} className="w-full rounded-lg shadow-lg" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-500 text-lg mb-4 capitalize">{product.category}</p>
          <p className="text-3xl font-extrabold text-gray-900 mb-6">${product.price}</p>
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <button className="w-full bg-blue-500 text-white py-3 rounded-full hover:bg-blue-600 text-lg font-bold">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
```

**How does this page work?**
- `useParams()` is a hook from `react-router-dom` that gives us the dynamic part of the URL (the `:id`).
- We use `useAppSelector` to find the specific product in our Redux store whose ID matches the one from the URL.
- If the products haven't been fetched yet (e.g., if a user lands directly on this page), the `useEffect` will dispatch `fetchProducts`.
- If the product isn't found yet, it shows a loading message.
- Once the product is found, it displays its image, title, price, and description in a two-column layout.

## Step 4: Link to the Details Page

The last step is to make our `ProductCard`s link to this new page.

1.  Open `src/components/ProductCard.tsx`.
2.  Wrap the main `div` with a `<Link>` component from `react-router-dom`.

Modify `ProductCard.tsx` like this:

```tsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { Product } from './ProductCard'; // Assuming Product type is here or imported

// ... (Product and ProductCardProps interfaces)

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`}>
      <div className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
        <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded-t-lg" />
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold truncate">{product.title}</h3>
          <p className="text-gray-500">{product.category}</p>
          <p className="mt-2 text-xl font-bold">${product.price}</p>
          <div className="flex-grow" /> {/* Pushes button to the bottom */}
          <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600">
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
```
**Note:** We've removed the `button`'s functionality for now. The entire card is now a link.

## Step 5: Test It Out

Go to your homepage in the browser. Click on any product card. You should be taken to a new URL (like `/product/3`) and see the detailed view for that product!

**Amazing!** You now have a multi-page application. Next, we'll finally make the "Add to Cart" button work using Redux.
