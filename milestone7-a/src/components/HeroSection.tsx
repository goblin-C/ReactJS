import Button from './Button'

export const HeroSection = () => {
  return (
    <section className=" mt-[81px]
      h-[calc(100vh-13.9375rem)] p-[2rem] lg:p-[4rem] xl:p-[6rem]
      bg-[#F2F0F1]
      xl:bg-[url('/hero_background.png')] xl:bg-contain xl:bg-right xl:bg-no-repeat
    ">
      <div className="flex flex-wrap">
        <div>
          <h2 className="
            font-alfa
            text-[1.5rem]
            md:text-[2rem]
            lg:text-[2.5rem]
            xl:text-[3rem]
            pb-[1.4375rem]
          ">
            FIND CLOTHES
            <br />
            THAT MATCH YOUR
            <br />
            STYLE PERFECTLY
          </h2>
          <p className="
            text-[#00000099]
            mb-8
            text-[0.875rem] md:text-[1rem] lg:text-[1.125rem]
          ">
            Browse through our diverse range of meticulously crafted garments,
            <br />
            designed to bring out your individuality and cater to your sense of style.
          </p>
          <Button
            buttonText='Shop Now'
            width='13.125rem'    // 210px ≈ 13.125rem
          />

          {/* Stats */}
          <div className="hidden lg:flex flex-wrap gap-8 mt-12">
            <div className="border-r border-[#0000001A] pr-8">
              <div className="text-hero-stat-text">200+</div>
              <div className="text-[#00000099]">International Brands</div>
            </div>
            <div className="border-r border-[#0000001A] pr-8">
              <div className="text-hero-stat-text">2,000+</div>
              <div className="text-[#00000099]">High-Quality Products</div>
            </div>
            <div>
              <div className="text-hero-stat-text">30,000+</div>
              <div className="text-[#00000099] text-[1rem]">Happy Customers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
