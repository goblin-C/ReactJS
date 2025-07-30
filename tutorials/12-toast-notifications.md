# 12. Adding Toast Notifications

Our app is functional, but the `alert()` messages are a bit jarring. Let's add "toast notifications" – those little pop-up messages that appear for a few seconds. We'll use the `sonner` library, which should already be in your project.

## Step 1: Add the Toaster to Your App

The `sonner` library requires a `<Toaster />` component to be placed at the root of your application. This component is responsible for rendering all the toast notifications.

1.  Open `src/App.tsx`.
2.  Import `Toaster` from `sonner`.
3.  Place it inside your main layout `div`.

Your `App.tsx` should look like this:

```tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner'; // Import Toaster
import Header from './components/Header';
import Footer from './components/Footer';
import { HomePage } from './pages/HomePage';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Toaster richColors position="top-right" /> {/* Add the Toaster here */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
```
**What do the props mean?**
- `richColors`: This gives us nice default styling for success (green), error (red), etc.
- `position="top-right"`: This makes the notifications appear in the top-right corner of the screen.

## Step 2: Trigger a Toast Notification

Now, let's replace the `alert()` on the product details page with a toast.

1.  Open `src/pages/ProductDetails.tsx`.
2.  Import `toast` from `sonner`.
3.  Call `toast.success()` when an item is added to the cart.

Modify the `handleAddToCart` function in `ProductDetails.tsx`:

```tsx
// ... (imports)
import { toast } from 'sonner'; // Import toast

const ProductDetails = () => {
  // ... (existing code)
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      toast.success(`${product.title} was added to your cart!`); // Use toast instead of alert
    }
  };

  // ... (rest of the component)
};

export default ProductDetails;
```

## Step 3: Add Toasts to the Cart Page

We can also add notifications when a user removes an item from the cart.

1.  Open `src/pages/Cart.tsx`.
2.  Import `toast`.
3.  Call `toast.error()` when an item is removed.

Modify the `handleRemove` function in `Cart.tsx`:

```tsx
// ... (imports)
import { toast } from 'sonner'; // Import toast

const Cart = () => {
  // ... (existing code)
  const dispatch = useAppDispatch();

  const handleRemove = (id: number) => {
    const item = cartItems.find(i => i.id === id);
    dispatch(removeFromCart(id));
    if (item) {
      toast.error(`${item.title} was removed from your cart.`);
    }
  };

  // ... (rest of the component)
};

export default Cart;
```

## Step 4: See the Magic!

1.  Go to a product page and click "Add to Cart". A beautiful green notification should slide in from the top-right.
2.  Go to your cart page and click "Remove". A red notification should appear.

The notifications will disappear on their own after a few seconds.

---

## You Did It! 🎉

**Congratulations!** You have successfully built a complete, modern e-commerce application from the ground up.

You've learned how to:
- Set up a React project with Vite.
- Build components with React and style them with Tailwind CSS.
- Create a multi-page application with React Router.
- Manage application state with Redux Toolkit.
- Fetch data from a real API.
- Implement a shopping cart.
- Add professional-looking user notifications.

This is a huge accomplishment. You now have a solid foundation to build even more amazing web applications. Feel free to experiment with what you've built—add new features, change the styling, or connect to different APIs.

**Happy coding!**
