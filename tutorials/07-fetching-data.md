# 7. Fetching Real Product Data

So far, we've been using fake "sample" data. Now, let's make our store feel real by fetching product information from the internet using an API. We'll use the popular [FakeStoreAPI](https://fakestoreapi.com/) for this.

## Step 1: Setting Up the API Service

It's good practice to keep all your API-related code in one place.

1.  Go to the `src/services/` folder.
2.  You should see a file named `useApi.tsx`. Let's examine its contents. If it's not there, create it.

Open `src/services/useApi.tsx` and ensure it looks like this:

```tsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://fakestoreapi.com';

// This is a custom hook for fetching data
export const useApi = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/products`);
      return response.data;
    } catch (err) {
      setError('Failed to fetch products');
      return [];
    } finally {
      setLoading(false);
    }
  };

  // We can add more functions here later, like getProductById, etc.

  return { loading, error, getProducts };
};
```

**What's happening here?**
- We're using `axios`, a popular library for making HTTP requests (like fetching data from a URL).
- We define a base URL for the API.
- We create a custom React hook called `useApi`. Hooks are a way to reuse stateful logic.
- The `getProducts` function fetches the list of products from `/products` endpoint.
- It handles `loading` and `error` states, which is very important for a good user experience.

## Step 2: Setting Up Redux for Products

We need a place to store the products once we fetch them. We'll use Redux, a state management library, for this.

1.  Go to `src/store/slices/`.
2.  Open or create `productSlice.tsx`.

Add the following code to `productSlice.tsx`:

```tsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from '../../components/ProductCard'; // Reuse our Product type

// This is an "async thunk" for fetching the data
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
});

interface ProductState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  status: 'idle',
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default productSlice.reducer;
```

**What's this Redux code doing?**
- `createAsyncThunk` is a special function from Redux Toolkit that helps with asynchronous actions, like fetching data.
- We define a `productSlice` which manages the state for our products (`items`, `status`, `error`).
- The `extraReducers` part handles the different states of our `fetchProducts` action:
    - `pending`: When the request starts.
    - `fulfilled`: When the data arrives successfully.
    - `rejected`: If there was an error.

## Step 3: Configure the Redux Store

Now, let's make sure our application knows about this new `productSlice`.

1.  Go to `src/store/`.
2.  Open `index.tsx`.

Make sure it looks like this:

```tsx
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
// We'll add more reducers here later
// import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    // cart: cartReducer,
  },
});

// These are useful types for working with our store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

## Step 4: Provide the Store to the App

Finally, we need to "provide" the Redux store to our entire React application.

1.  Open `src/main.tsx` (the entry point of your app).
2.  Wrap your `<App />` component with the `Provider` from `react-redux`.

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store'; // Import our store
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
```

**Phew! That was a lot of setup.** But now we have a powerful system for managing our application's data.

**Next up:** We'll modify our `ProductSection` to use this new Redux-powered data instead of the fake sample data.
