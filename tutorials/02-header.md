# 2. Building the Header

Every website needs a good header. It's the first thing people see. Let's build one for our e-commerce store.

## What's in a Header?

Our header will have:
- A logo
- Navigation links (like "Shop," "About," etc.)
- A search bar
- A shopping cart icon

## Step 1: Create the Header File

1.  Go to the `src/components/` folder.
2.  Create a new file named `Header.tsx`.

## Step 2: Write the Basic Header Code

Let's start with a simple structure. Open `src/components/Header.tsx` and add this code:

```tsx
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <div>
          <a href="/" className="text-2xl font-bold text-gray-800">
            E-Store
          </a>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-gray-800">Shop</a>
          <a href="#" className="text-gray-600 hover:text-gray-800">On Sale</a>
          <a href="#" className="text-gray-600 hover:text-gray-800">New Arrivals</a>
          <a href="#" className="text-gray-600 hover:text-gray-800">Brands</a>
        </nav>

        {/* Search and Cart */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-full py-1 px-3"
            />
            <img src="/search.svg" alt="Search" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" />
          </div>
          <a href="/cart">
            <img src="/cart.svg" alt="Cart" className="w-6 h-6" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
```

**What does this code do?**
- It creates a `header` element with a white background and a subtle shadow.
- We use Flexbox (`flex`, `justify-between`, `items-center`) to arrange the logo, navigation, and icons.
- The navigation links are hidden on small screens (`hidden md:flex`).
- We've added placeholders for the logo, search icon, and cart icon. Make sure you have `search.svg` and `cart.svg` in your `public/` folder.

## Step 3: Add the Header to Your App

Now, let's show the header on our main page.

1.  Open `src/App.tsx`.
2.  Import the `Header` component at the top of the file.
3.  Add the `<Header />` component inside the main `div`.

Your `src/App.tsx` should look something like this:

```tsx
import React from 'react';
import Header from './components/Header'; // Import the Header
import { HomePage } from './pages/HomePage'; // Assuming you have this

function App() {
  return (
    <div>
      <Header /> {/* Add the Header here */}
      <HomePage /> {/* The rest of your app */}
    </div>
  );
}

export default App;
```

## Step 4: Check Your Work

Go back to your browser at `http://localhost:5173`. You should now see your new header at the top of the page!

**Great job!** You've built the header. Next, we'll create the big, eye-catching "Hero Section" that goes right below the header.
