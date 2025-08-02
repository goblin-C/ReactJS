export const BrandSection = () => {
  const brands = ["ZARA", "GUCCI", "PRADA"]

  return (
    <section className="bg-black py-8 md:py-11">
      <div className="px-4 md:px-8 lg:px-16 xl:px-24 max-w-7xl mx-auto">
        <div className="flex justify-center md:justify-between items-center flex-wrap gap-6 md:gap-8">
          {brands.slice(0, 3).map((brand, index) => (
            <div key={index} className="flex-shrink-0">
              <img 
                src={brand.toLowerCase() + '_logo.svg'} 
                alt={brand}
                className="h-6 md:h-8 lg:h-10 w-auto object-contain"
              />
            </div>
          ))}
          {/* Show additional brands on larger screens */}
          <div className="hidden lg:contents">
            {brands.slice(3).map((brand, index) => (
              <div key={index + 3} className="flex-shrink-0">
                <img 
                  src={brand.toLowerCase() + '_logo.svg'} 
                  alt={brand}
                  className="h-6 md:h-8 lg:h-10 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}