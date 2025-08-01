# 8. Connecting Components to Redux

We've set up Redux and created a way to fetch products. Now, let's connect our `ProductSection` component to the Redux store to display the real data.

## Step 1: Create Custom Redux Hooks

To make it easier to interact with our Redux store, it's a common pattern to create typed hooks.

1.  Go to `src/hooks/`.
2.  Create a new file named `useRedux.ts` (or similar).
3.  Add the following code:

```ts
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```
This saves us from having to import the `RootState` and `AppDispatch` types in every component where we use Redux.

## Step 2: Update the ProductSection Component

Now, let's modify `ProductSection.tsx` to fetch and display the products from our Redux store.

Open `src/components/ProductSection.tsx` and replace its content with this:

```tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchProducts } from '../store/slices/productSlice';
import ProductCard from './ProductCard';
import { RootState } from '../store';

const ProductSection = () => {
  const dispatch = useAppDispatch();
  const { items: products, status, error } = useAppSelector((state: RootState) => state.products);

  useEffect(() => {
    // Only fetch products if we haven't already
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Show a loading message
  if (status === 'loading') {
    return <div className="text-center py-12">Loading products...</div>;
  }

  // Show an error message
  if (status === 'failed') {
    return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
```

**What did we change?**
- We removed the `sampleProducts` array. No more fake data!
- `useAppDispatch` is a hook that lets us "dispatch" actions, like our `fetchProducts` action.
- `useAppSelector` is a hook that lets us select and read data from the Redux store. We are pulling out the `items` (which we rename to `products`), `status`, and `error` from our `productSlice`.
- `useEffect` is a React hook that runs code after the component renders. We use it to dispatch our `fetchProducts` action when the component first loads. The `if (status === 'idle')` check prevents us from re-fetching the data every time the component re-renders.
- We now have conditional rendering:
    - If `status` is `'loading'`, we show a "Loading..." message.
    - If `status` is `'failed'`, we show an error message.
    - If `status` is `'succeeded'`, we map over the `products` from the store and render the `ProductCard`s.

## Step 3: See It in Action!

Go to your browser. You should see a "Loading products..." message for a moment, and then the product grid should appear, populated with real products from the FakeStoreAPI!

**Congratulations!** You have successfully connected your React components to a Redux store and are now displaying dynamic data. This is a huge step in building a real web application.

**Next:** We'll create a new page to see the details of a single product when you click on it. This will involve setting up page routing.
