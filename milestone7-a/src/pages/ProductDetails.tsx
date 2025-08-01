import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Star, Minus, Plus, Check } from "lucide-react";
import Button from "../components/Button";
import { Footer } from "../components/Footer";
import { Breadcrumb } from "../components/Breadcrumb";
import ToastMessage from "../components/ToastMessage";
import { AppDispatch, RootState } from "../store";
import { addItem } from "../store/slices/cartSlice";
import { showToast } from "../store/slices/uiSlice";
import useApi from "../services/useApi";

const LoadingSpinner = ({ message }: { message: string }) => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
      <p className="text-lg font-medium text-gray-700">{message}</p>
    </div>
  </div>
);

const QuantitySelector = ({
  quantity,
  onUpdate,
}: {
  quantity: number;
  onUpdate: (qty: number) => void;
}) => (
  <div className="flex items-center bg-gray-100 rounded-full">
    {[
      { icon: Minus, action: -1 },
      { icon: Plus, action: 1 },
    ]
      .map(({ icon: Icon, action }, idx) => (
        <button
          key={idx}
          onClick={() => onUpdate(Math.max(1, quantity + action))}
          className="p-3 hover:bg-gray-200 rounded-full"
        >
          <Icon className="w-6 h-6" />
        </button>
      ))
      .reduce(
        (acc, btn, idx) => [
          ...acc,
          ...(idx === 1
            ? [
                <span key="qty" className="px-8 py-3 font-medium">
                  {quantity}
                </span>,
              ]
            : []),
          btn,
        ],
        []
      )}
  </div>
);

const SelectionGroup = ({
  title,
  options,
  selected,
  onSelect,
  type = "button",
}: {
  title: string;
  options: any[];
  selected: string;
  onSelect: (value: string) => void;
  type?: "button" | "color";
}) => (
  <div>
    <h3 className="text-lg font-medium mb-3">{title}</h3>
    <div className="flex space-x-3">
      {options.map((option) => {
        const value = typeof option === "string" ? option : option.name;
        const isSelected = selected === value;

        return type === "color" ? (
          <button
            key={value}
            onClick={() => onSelect(value)}
            className={`w-10 h-10 rounded-full ${option.class} border-2 ${
              isSelected ? "border-black" : "border-gray-300"
            } flex items-center justify-center`}
          >
            {isSelected && <Check className="w-4 h-4 text-white" />}
          </button>
        ) : (
          <button
            key={value}
            onClick={() => onSelect(value)}
            className={`px-6 py-3 rounded-full border ${
              isSelected
                ? "bg-black text-white border-black"
                : "bg-[#F0F0F0] text-[#00000099] border-gray-300"
            }`}
          >
            {value}
          </button>
        );
      })}
    </div>
  </div>
);

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { getAPI } = useApi();
  const cartItems = useSelector((state: RootState) => state.cart.data || []);

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("Large");
  const [selectedColor, setSelectedColor] = useState("brown");
  const [quantity, setQuantity] = useState(1);

  
  // Check if current product with selected options is already in cart
  const isInCart = cartItems.some(
    (item: any) => item.id === product?.id && item.size === selectedSize && item.color === selectedColor
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getAPI(`products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const sizes = ["Small", "Medium", "Large", "X-Large"];
  const colors = [
    { name: "brown", class: "bg-amber-800" },
    { name: "green", class: "bg-green-800" },
    { name: "navy", class: "bg-blue-900" },
  ];

  if (loading) return <LoadingSpinner message="Loading..." />;
  if (!product) return <LoadingSpinner message="Product Not Found" />;

  const breadcrumbs = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "#" },
    { label: product.category?.name || "Product", path: "#" },
  ];

  return (
    <div>
      <Breadcrumb items={breadcrumbs} />

      <div className="px-4 md:px-8 lg:px-16 xl:px-24 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            {/* Thumbnail images - hidden on mobile, shown as row on tablet+ */}
            <div className="hidden md:flex md:flex-col gap-3">
              {(product.images || [])
                .slice(0, 3)
                .map((img: string, i: number) => (
                  <div
                    key={i}
                    className="w-20 h-24 md:w-24 md:h-32 lg:w-32 lg:h-40 overflow-hidden"
                  >
                    <img
                      src={img}
                      alt={`${product.title} view ${i + 1}`}
                      className="rounded-2xl w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </div>
                ))}
            </div>
            
            {/* Main product image */}
            <div className="flex-1 aspect-square md:aspect-[4/5] overflow-hidden">
              <img
                src={product.images[0] || product.images?.[0]}
                alt={product.title}
                className="rounded-2xl w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-xl md:text-2xl lg:text-navbar-h1 font-alfa mb-4">{product.title}</h1>
              <span className="text-2xl md:text-3xl lg:text-product-view-price font-bold">${product.price}</span>
            </div>

            <p className="text-[#00000099] leading-relaxed text-sm md:text-base pb-6 border-b border-[#0000001A]">
              {product.description}
            </p>

            <div className="pb-6 border-b border-[#0000001A]">
              <SelectionGroup
                title="Select Colors"
                options={colors}
                selected={selectedColor}
                onSelect={setSelectedColor}
                type="color"
              />
            </div>
            
            <div className="pb-6 border-b border-[#0000001A]">
              <SelectionGroup
                title="Choose Size"
                options={sizes}
                selected={selectedSize}
                onSelect={setSelectedSize}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <QuantitySelector quantity={quantity} onUpdate={setQuantity} />
              <Button 
                buttonText="Add to Cart"
                width="100%"
                className="flex-1 min-w-0"
                onClick={() => {
                  const cartItem = {
                    id: product.id,
                    name: product.title,
                    price: product.price,
                    image: product.images?.[0] || product.category?.image,
                    size: selectedSize,
                    color: selectedColor,
                    quantity
                  };
                  
                  dispatch(addItem(cartItem));
                  dispatch(showToast({ 
                    message: isInCart ? 'Cart updated successfully!' : 'Product added to cart successfully!', 
                    type: 'success' 
                  }));
                  navigate('/');
                }}
              />
            </div>
          </div>
        </div>
      </div>
      

      
      <Footer />
    </div>
  );
}
