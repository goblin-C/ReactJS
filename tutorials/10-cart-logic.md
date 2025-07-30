# 10. Handling the Shopping Cart

It's time to make our "Add to Cart" button actually do something! We'll use Redux to manage the state of our shopping cart.

## Step 1: Create the Cart Slice

Just like we did for products, we'll create a "slice" to manage all cart-related data and actions.

1.  Go to `src/store/slices/`.
2.  Create a new file named `cartSlice.tsx`.
3.  Add the following code:

```tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../components/ProductCard';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
```

**What does this slice do?**
- It defines a `CartItem` type, which is just a `Product` with an added `quantity`.
- The initial state is an empty array of `items`.
- It has three "reducers" (actions):
    - `addToCart`: Adds a product to the cart. If the product is already in the cart, it just increases the quantity.
    - `removeFromCart`: Removes an item from the cart completely.
    - `updateQuantity`: Changes the quantity of a specific item in the cart.

## Step 2: Add the Cart Slice to the Store

Now, let's tell our main Redux store about this new slice.

1.  Open `src/store/index.tsx`.
2.  Import the `cartReducer` and add it to the `reducer` object.

```tsx
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice'; // Import cart reducer

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer, // Add it here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

## Step 3: Make the "Add to Cart" Button Work

Let's update the button on the `ProductDetails` page to dispatch our `addToCart` action.

1.  Open `src/pages/ProductDetails.tsx`.
2.  Import the `addToCart` action and `useAppDispatch`.
3.  Create a handler function to dispatch the action.

Modify the `ProductDetails` component:

```tsx
// ... (imports)
import { addToCart } from '../store/slices/cartSlice'; // Import the action

const ProductDetails = () => {
  // ... (existing code: useParams, useSelector, etc.)
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      // We'll add a notification here in the next step!
      alert(`${product.title} added to cart!`);
    }
  };

  if (!product) {
    // ... (loading state)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* ... (product image and details) */}
        <div>
          {/* ... */}
          <button 
            onClick={handleAddToCart} // Add onClick handler
            className="w-full bg-blue-500 text-white py-3 rounded-full hover:bg-blue-600 text-lg font-bold"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
```

## Step 4: Update the Header to Show Cart Count

It would be great to see how many items are in the cart right from the header.

1.  Open `src/components/Header.tsx`.
2.  Use `useAppSelector` to get the cart items.
3.  Display the total number of items.

Modify `Header.tsx`:

```tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/useRedux'; // Import hook
import { RootState } from '../store';

const Header = () => {
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* ... (Logo and Nav) */}

        {/* Search and Cart */}
        <div className="flex items-center space-x-4">
          {/* ... (Search bar) */}
          <Link to="/cart" className="relative">
            <img src="/cart.svg" alt="Cart" className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
```
**What's new?**
- We get the `cartItems` from the Redux store.
- We calculate `totalItems` by summing up the quantities of all items in the cart.
- If `totalItems` is greater than 0, we display a small red circle (a "badge") on the cart icon showing the count.

## Step 5: Test Your Cart!

1.  Go to a product details page.
2.  Click the "Add to Cart" button. An alert should pop up.
3.  Look at the header. The cart icon should now show a "1".
4.  Click the button again. The number should change to "2".

**Success!** You now have a working shopping cart. The final steps are to create a page to view the cart and to add nice pop-up notifications.
