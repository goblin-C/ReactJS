import Button from './Button'

export const HeroSection = () => {
  return (
    <section className="
      mt-16 md:mt-20 lg:mt-24
      min-h-[70vh] md:min-h-[80vh]
      px-4 py-8 md:px-8 lg:px-16 xl:px-24
      bg-[#F2F0F1]
      xl:bg-[url('/hero_background.png')] xl:bg-contain xl:bg-right xl:bg-no-repeat
      flex items-center
    ">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col max-w-2xl">
          <h2 className="
            font-alfa
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
            leading-tight
            mb-4 md:mb-6
          ">
            FIND CLOTHES
            <br />
            THAT MATCH YOUR
            <br />
            STYLE PERFECTLY
          </h2>
          <p className="
            text-[#00000099]
            mb-6 md:mb-8
            text-sm md:text-base lg:text-lg
            leading-relaxed
            max-w-lg
          ">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of style.
          </p>
          <div className="mb-8 md:mb-12">
            <Button
              buttonText='Shop Now'
              width='100%'
              className='max-w-xs'
            />
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 md:gap-8">
            <div className="flex-1 min-w-[120px] md:border-r border-[#0000001A] md:pr-4 lg:pr-8">
              <div className="text-2xl md:text-3xl lg:text-hero-stat-text font-bold">200+</div>
              <div className="text-[#00000099] text-xs md:text-sm">International Brands</div>
            </div>
            <div className="flex-1 min-w-[120px] md:border-r border-[#0000001A] md:pr-4 lg:pr-8">
              <div className="text-2xl md:text-3xl lg:text-hero-stat-text font-bold">2,000+</div>
              <div className="text-[#00000099] text-xs md:text-sm">High-Quality Products</div>
            </div>
            <div className="flex-1 min-w-[120px]">
              <div className="text-2xl md:text-3xl lg:text-hero-stat-text font-bold">30,000+</div>
              <div className="text-[#00000099] text-xs md:text-sm">Happy Customers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
