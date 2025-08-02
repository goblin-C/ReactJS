interface StyleCategory {
  name: string
  image: string
}

export const StyleSection = () => {
  const styleCategories: StyleCategory[] = [
    { name: "Casual", image: "casual.png" },
    { name: "Formal", image: "formal.png" },
    { name: "Party", image: "party.png" },
    { name: "Gym", image: "gym.png" },
  ]

  return (
    <section className="py-8 md:py-12 lg:py-16">
      <div className="px-4 md:px-8 lg:px-16 xl:px-24 max-w-7xl mx-auto">
        <div className="bg-[#F0F0F0] p-6 md:p-12 lg:p-16 rounded-2xl md:rounded-3xl lg:rounded-[40px]">
          <h2 className="text-xl md:text-2xl lg:text-product-title-text font-alfa text-center mb-8 md:mb-12">BROWSE BY STYLE</h2>
          
          {/* Mobile: 2x2 grid */}
          <div className="grid grid-cols-2 gap-3 md:hidden">
            {styleCategories.map((category, index) => (
              <div key={index} className="relative cursor-pointer overflow-hidden rounded-2xl group">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-3">
                  <span className="text-white font-semibold text-sm">{category.name}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Tablet and Desktop: Original layout */}
          <div className="hidden md:block">
            <div className="flex justify-center gap-3 lg:gap-5 mb-3 lg:mb-5">
              <div className="relative cursor-pointer overflow-hidden rounded-2xl group flex-1 max-w-sm">
                <img
                  src={styleCategories[0].image || "/placeholder.svg"}
                  alt={styleCategories[0].name}
                  className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-4">
                  <span className="text-white font-semibold text-lg">{styleCategories[0].name}</span>
                </div>
              </div>
              <div className="relative cursor-pointer overflow-hidden rounded-2xl group flex-1 max-w-2xl">
                <img
                  src={styleCategories[1].image || "/placeholder.svg"}
                  alt={styleCategories[1].name}
                  className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-4">
                  <span className="text-white font-semibold text-lg">{styleCategories[1].name}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-3 lg:gap-5">
              <div className="relative cursor-pointer overflow-hidden rounded-2xl group flex-1 max-w-2xl">
                <img
                  src={styleCategories[2].image || "/placeholder.svg"}
                  alt={styleCategories[2].name}
                  className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-4">
                  <span className="text-white font-semibold text-lg">{styleCategories[2].name}</span>
                </div>
              </div>
              <div className="relative cursor-pointer overflow-hidden rounded-2xl group flex-1 max-w-sm">
                <img
                  src={styleCategories[3].image || "/placeholder.svg"}
                  alt={styleCategories[3].name}
                  className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-4">
                  <span className="text-white font-semibold text-lg">{styleCategories[3].name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}