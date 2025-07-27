import { ProductCard } from "./ProductCard"

interface Product {
  id: number
  title: string
  price: string
  images: string[]
  rating?: number
}

interface ProductSectionProps {
  title: string
  products: Product[]
  showRating?: boolean
  backgroundColor?: string
}

export const ProductSection = ({ 
  title, 
  products, 
  showRating = false, 
  backgroundColor = "bg-white",
}: ProductSectionProps) => {
  return (
    <section className={`py-16 ${backgroundColor}`}>
      <div className="px-4 sm:px-6 lg:px-[100px]">
        <h2 className="text-product-title-text font-alfa text-center mb-12">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-[61px] 2xl:gap-x-8">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              showRating={showRating} 
            />
          ))}
        </div>
      </div>
    </section>
  )
}