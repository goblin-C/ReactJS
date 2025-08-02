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
    <section className="py-16">
      <div className="px-4 sm:px-6 lg:mx-[100px] bg-[#F0F0F0] pt-[66px] pb-[76px] rounded-[40px]">
        <h2 className="text-product-title-text font-alfa text-center mb-12">BROWSE BY STYLE</h2>
          <div className="flex justify-center relative cursor-pointer overflow-hidden gap-5">
            <img
              src={styleCategories[0].image || "/placeholder.svg"}
              alt={styleCategories[0].name}
              className="w-[407px] object-contain hover:scale-105 rounded-[20px] transition-transform duration-300"
            />
            <img
              src={styleCategories[1].image || "/placeholder.svg"}
              alt={styleCategories[1].name}
              className="w-[684px] object-contain hover:scale-105 rounded-[20px] transition-transform duration-300"
            />
          </div>
          <div className="flex justify-center relative cursor-pointer overflow-hidden gap-5 pt-5">
            <img
              src={styleCategories[2].image || "/placeholder.svg"}
              alt={styleCategories[2].name}
              className="w-[684px] object-contain hover:scale-105 rounded-[20px] transition-transform duration-300"
            />
            <img
              src={styleCategories[3].image || "/placeholder.svg"}
              alt={styleCategories[3].name}
              className="w-[407px] object-contain hover:scale-105 rounded-[20px] transition-transform duration-300"
            />
          </div>
      </div>
    </section>
  )
}