# 5. Adding Style and Brand Sections

To make our homepage more engaging, let's add a couple more sections: one to browse by style and another to showcase the brands we carry.

## Part 1: The Style Section

This section will feature different clothing styles (like Casual, Formal, etc.) with images.

### Step 1: Create the Style Section File

1.  In `src/components/`, create a new file named `StyleSection.tsx`.

### Step 2: Write the Style Section Code

Open `src/components/StyleSection.tsx` and add this code:

```tsx
import React from 'react';

const styles = [
  { name: 'Casual', image: '/casual.png' },
  { name: 'Formal', image: '/formal.png' },
  { name: 'Party', image: '/party.png' },
  { name: 'Gym', image: '/gym.png' },
];

const StyleSection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Browse By Dress Style</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {styles.map((style) => (
            <div key={style.name} className="relative rounded-lg overflow-hidden shadow-lg">
              <img src={style.image} alt={style.name} className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">{style.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StyleSection;
```

**What's happening here?**
- We have an array of `styles`, each with a name and an image. Make sure you have `casual.png`, `formal.png`, `party.png`, and `gym.png` in your `public/` folder.
- We use a responsive grid to display the styles.
- Each style is a card with an image. We add a semi-transparent black overlay (`bg-black bg-opacity-40`) to make the text on top more readable.

## Part 2: The Brand Section

This is a simple section to display logos of brands.

### Step 1: Create the Brand Section File

1.  In `src/components/`, create a file named `BrandSection.tsx`.

### Step 2: Write the Brand Section Code

Open `src/components/BrandSection.tsx` and add this:

```tsx
import React from 'react';

const brands = [
  { name: 'Zara', logo: '/zara_logo.svg' },
  { name: 'Gucci', logo: '/gucci_logo.svg' },
  { name: 'Prada', logo: '/prada_logo.svg' },
  { name: 'Calvin Klein', logo: '/calvin_klein_logo.svg' },
];

const BrandSection = () => {
  return (
    <section className="py-8 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-around items-center">
          {brands.map((brand) => (
            <div key={brand.name} className="p-4">
              <img src={brand.logo} alt={brand.name} className="h-12" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSection;
```

**What does this code do?**
- It displays a list of brand logos from an array. Make sure you have the corresponding SVG files in your `public/` folder.
- We use Flexbox (`flex`, `flex-wrap`, `justify-around`) to create a simple, responsive layout for the logos.

## Step 3: Add Them to the Homepage

Now, let's update `src/pages/HomePage.tsx` to include these new sections.

```tsx
import React from 'react';
import HeroSection from '../components/HeroSection';
import BrandSection from '../components/BrandSection';   // Import BrandSection
import ProductSection from '../components/ProductSection';
import StyleSection from '../components/StyleSection';   // Import StyleSection

export const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <BrandSection />
      <ProductSection />
      <StyleSection />
    </main>
  );
};
```

## Step 4: See the Result

Check your browser. You should now have a "Browse By Dress Style" section and a "Brands" section on your homepage, making it look much more complete!

**Excellent work!** The homepage is really taking shape. The last piece of the main page is the footer. Let's build that next.
