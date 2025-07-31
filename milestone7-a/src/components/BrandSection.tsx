export const BrandSection = () => {
  const brands = ["ZARA", "GUCCI", "PRADA"]

  return (
    <section className="hidden xl:block bg-black py-11">
      <div className="mx-[100px]">
        <div className="flex justify-between items-center flex-wrap gap-8">
          {brands.map((brand, index) => (
            <div key={index} className="">
              <img src={brand.toLocaleLowerCase() + '_logo.svg'}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}