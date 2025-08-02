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
    <section className={`py-8 md:py-12 lg:py-16 ${backgroundColor}`}>
      <div className="px-4 md:px-8 lg:px-16 xl:px-24 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-product-title-text font-alfa text-center mb-8 md:mb-12">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
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