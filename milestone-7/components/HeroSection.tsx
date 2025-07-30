import Button from './Button'

export const HeroSection = () => {
  return (
    <section className="h-[calc(100vh-223px)] pb-[122px] pt-[93px] px-[100px] bg-[url('/hero_background.png')] bg-contain bg-right bg-no-repeat bg-[#F2F0F1]">
      <div className="">
        <div>
          <div>
            <h2 className="font-alfa text-hero-header-text pb-[23px]">
              FIND CLOTHES
              <br />
              THAT MATCH YOUR
              <br />
              STYLE PERFECTLY
            </h2>
            <p className="text-[#00000099] mb-8 text-[16px]">
              Browse through our diverse range of meticulously crafted garments,
              <br />
              designed to bring out your individuality and cater to your sense of style.
            </p>
            <Button 
              buttonText='Shop Now' 
              width='210px' 
            />
            
            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-12">
              <div className='border-r border-[#0000001A] pr-8'>
                <div className="text-hero-stat-text">200+</div>
                <div className="text-[#00000099]">International Brands</div>
              </div>
              <div className='border-r border-[#0000001A] pr-8'>
                <div className="text-hero-stat-text">2,000+</div>
                <div className="text-[#00000099]">High-Quality Products</div>
              </div>
              <div>
                <div className="text-hero-stat-text">30,000+</div>
                <div className="text-[#00000099] text-[16px]">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}