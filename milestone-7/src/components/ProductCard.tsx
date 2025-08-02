import { useNavigate } from "react-router-dom";
interface Product {
  id: number
  title: string
  price: string
  images: string[]
}

interface ProductCardProps {
  product: Product
  showRating?: boolean
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  // Handle edit button click
    const handleClick = (productId: string) => {
        navigate(`/product/${productId}`);
    };
  return (
    <div className="group cursor-pointer" onClick={() => handleClick(product.id.toString())}>
      <div className="rounded-2xl overflow-hidden mb-4 aspect-square">
        <img
          src={product.images[0] || "/placeholder.svg"}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h3 className="text-base md:text-lg lg:text-product-card-title mb-2 truncate text-left font-semibold" title={product.title}>{product.title}</h3>
      <p className="text-lg md:text-xl lg:text-product-card-price text-left font-bold">{'$' + product.price}</p>
    </div>
  )
}
