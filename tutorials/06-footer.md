# 6. Building the Footer

Every good website needs a footer. It's where you put important links, contact information, and social media icons.

## What's in Our Footer?

- Columns with links (like "Company," "Help," "FAQ")
- Social media icons
- Copyright information

## Step 1: Create the Footer File

1.  Go to the `src/components/` folder.
2.  Create a new file named `Footer.tsx`.

## Step 2: Write the Footer Code

Open `src/components/Footer.tsx` and add this code:

```tsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">E-Store</h3>
            <p className="text-gray-400">
              Your one-stop shop for the latest fashion trends.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shopping</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300">New Arrivals</a></li>
              <li><a href="#" className="hover:text-gray-300">Best Sellers</a></li>
              <li><a href="#" className="hover:text-gray-300">Sale</a></li>
            </ul>
          </div>

          {/* More Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Help</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300">Contact Us</a></li>
              <li><a href="#" className="hover:text-gray-300">FAQs</a></li>
              <li><a href="#" className="hover:text-gray-300">Shipping & Returns</a></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {/* Replace with actual icons later */}
              <a href="#" className="hover:text-gray-300">FB</a>
              <a href="#" className="hover:text-gray-300">IG</a>
              <a href="#" className="hover:text-gray-300">TW</a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} E-Store. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

**What does this code do?**
- It creates a `footer` with a dark background.
- A responsive grid is used to create four columns that stack on smaller screens.
- We have sections for a brief "About," shopping links, help links, and social media.
- At the very bottom, there's a copyright notice that automatically updates the year.

## Step 3: Add the Footer to Your App

The footer should appear on every page. A good place to put it is in `App.tsx`.

1.  Open `src/App.tsx`.
2.  Import the `Footer` component.
3.  Add the `<Footer />` component at the end, after your main content.

Your `src/App.tsx` should now look like this:

```tsx
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer'; // Import the Footer
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HomePage />
      </main>
      <Footer /> {/* Add the Footer here */}
    </div>
  );
}

export default App;
```

**Quick Tip:** We've wrapped our layout in a flex container (`flex flex-col min-h-screen`) and made the `main` content grow (`flex-grow`). This is a common trick to make the footer "stick" to the bottom of the page, even if the content is short.

## Step 4: Check Your Work

Go back to your browser. Scroll down to the bottom of the page. You should see your new, professional-looking footer!

**Hooray!** You have now built all the main visual components of the homepage. Next, we'll officially assemble them in the `HomePage` component and then move on to fetching real data.
