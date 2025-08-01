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
      <div className="rounded-[20px] overflow-hidden mb-4 flex items-center justify-center">
        <img
          src={product.images[0] || "/placeholder.svg"}
          alt={product.title}
          className="w-full h-[298px] rounded-[20px] object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h3 className="text-product-card-title mb-2 truncate text-left" title={product.title}>{product.title}</h3>
      <p className="text-product-card-price text-left">{'$' + product.price}</p>
    </div>
  )
}
// w-[18.625rem] h-[18.4375rem]