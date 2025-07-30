# 3. Creating the Hero Section

The "Hero Section" is the big, welcoming area right below the header. It's designed to grab your visitor's attention with a large image and a call-to-action.

## What's in a Hero Section?

- A background image or color
- A title or headline
- A short description
- A "Shop Now" button

## Step 1: Create the Hero Section File

1.  Go to the `src/components/` folder.
2.  Create a new file named `HeroSection.tsx`.

## Step 2: Write the Hero Section Code

Open `src/components/HeroSection.tsx` and add this code. We'll use a placeholder image for now.

```tsx
import React from 'react';

const HeroSection = () => {
  return (
    <section
      className="bg-cover bg-center h-96 text-white"
      style={{ backgroundImage: "url('/hero_background.png')" }}
    >
      <div className="container mx-auto h-full flex flex-col justify-center items-start px-4">
        <h1 className="text-4xl md:text-5xl font-bold">Find The Best Fashion Style</h1>
        <h1 className="text-4xl md:text-5xl font-bold">For You</h1>
        <p className="mt-4 text-lg">
          Discover the latest trends and find your perfect look.
        </p>
        <button className="mt-6 bg-black text-white font-bold py-2 px-6 rounded-full hover:bg-gray-800">
          SHOP NOW
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
```

**What does this code do?**
- It creates a `section` that will serve as our hero banner.
- We're setting a background image using inline styles. Make sure you have a `hero_background.png` in your `public/` folder.
- The `h-96` class gives the section a fixed height.
- We use Flexbox again to center the content vertically and align it to the left.
- The text and button are styled to be easily readable against the background.

## Step 3: Add the Hero Section to Your Page

Now, let's add this new section to our `HomePage`.

1.  Open `src/pages/HomePage.tsx`.
2.  Import the `HeroSection` component.
3.  Add the `<HeroSection />` component.

Your `src/pages/HomePage.tsx` might look like this:

```tsx
import React from 'react';
import HeroSection from '../components/HeroSection'; // Import it

export const HomePage = () => {
  return (
    <main>
      <HeroSection /> {/* Add it here */}
      {/* Other sections will go here later */}
    </main>
  );
};
```

*(Note: If you don't have a `HomePage.tsx` yet, you can add the `HeroSection` directly into `App.tsx` below the `Header` for now.)*

## Step 4: See It Live

Check your browser. Right below your header, you should see your new, impressive Hero Section!

**Awesome!** You're building the page piece by piece. Next up, we'll create a section to display our products.
