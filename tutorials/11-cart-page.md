# 11. Building the Cart Page

Now that users can add items to their cart, they need a place to view them, change quantities, or remove them. Let's build the cart page.

## Step 1: Create the Cart Page File

1.  Go to the `src/pages/` folder.
2.  Create a new file named `Cart.tsx`.

## Step 2: Add the Route

We need to tell our router about this new page.

1.  Open `src/App.tsx`.
2.  Uncomment the route for the cart.

```tsx
// ... in App.tsx
import Cart from './pages/Cart'; // Make sure to import it

// ...
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/product/:id" element={<ProductDetails />} />
  <Route path="/cart" element={<Cart />} /> {/* Uncomment this line */}
</Routes>
// ...
```

## Step 3: Build the Cart Page Component

This component will display a list of items in the cart and the total price.

Open `src/pages/Cart.tsx` and add this code:

```tsx
import React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/useRedux';
import { RootState } from '../store';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: RootState) => state.cart.items);

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl">Your cart is empty.</p>
          <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center border p-4 rounded-lg">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover mr-4" />
                <div className="flex-grow">
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-gray-500">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    className="w-16 text-center border rounded mx-4"
                    min="1"
                  />
                  <button onClick={() => handleRemove(item.id)} className="text-red-500 hover:text-red-700">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="border p-6 rounded-lg h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t my-4"></div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-black text-white py-3 rounded-full mt-6 hover:bg-gray-800">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
```

**How does this page work?**
- It gets the `cartItems` from the Redux store.
- If the cart is empty, it shows a "Your cart is empty" message with a link to go back to shopping.
- If there are items, it maps over them and displays each one with its image, title, price, and quantity.
- The quantity is an `input` field. When it changes, the `handleQuantityChange` function dispatches the `updateQuantity` action.
- There's a "Remove" button that dispatches the `removeFromCart` action.
- On the side, there's an "Order Summary" box that calculates and displays the `subtotal`.
- A "Proceed to Checkout" button is there (it doesn't do anything yet).

## Step 4: Test Your Cart Page

1.  Add a few different items to your cart from the product pages.
2.  Click the cart icon in the header. You should be taken to the `/cart` page.
3.  You should see all your items listed.
4.  Try changing the quantity of an item. The subtotal should update automatically.
5.  Try removing an item. It should disappear from the list.

**You're so close to the finish line!** The application is now fully functional. The last step is to replace the ugly `alert()` messages with beautiful, professional toast notifications.
