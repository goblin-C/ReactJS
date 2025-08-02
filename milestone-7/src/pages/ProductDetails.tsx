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
  <div className="flex items-center bg-gray-100 rounded-full w-fit">
    <button
      onClick={() => onUpdate(Math.max(1, quantity - 1))}
      className="p-2 md:p-3 hover:bg-gray-200 rounded-full transition-colors"
      disabled={quantity <= 1}
    >
      <Minus className="w-4 h-4 md:w-5 md:h-5" />
    </button>
    <span className="px-4 md:px-6 py-2 md:py-3 font-medium text-sm md:text-base min-w-[3rem] text-center">
      {quantity}
    </span>
    <button
      onClick={() => onUpdate(quantity + 1)}
      className="p-2 md:p-3 hover:bg-gray-200 rounded-full transition-colors"
    >
      <Plus className="w-4 h-4 md:w-5 md:h-5" />
    </button>
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
    <h3 className="text-base md:text-lg font-medium mb-3">{title}</h3>
    <div className="flex flex-wrap gap-2 md:gap-3">
      {options.map((option) => {
        const value = typeof option === "string" ? option : option.name;
        const isSelected = selected === value;

        return type === "color" ? (
          <button
            key={value}
            onClick={() => onSelect(value)}
            className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${
              option.class
            } border-2 ${
              isSelected ? "border-black" : "border-gray-300"
            } flex items-center justify-center transition-all hover:scale-110`}
          >
            {isSelected && (
              <Check className="w-3 h-3 md:w-4 md:h-4 text-white" />
            )}
          </button>
        ) : (
          <button
            key={value}
            onClick={() => onSelect(value)}
            className={`px-3 py-2 md:px-4 md:py-3 rounded-full border text-sm md:text-base transition-colors ${
              isSelected
                ? "bg-black text-white border-black"
                : "bg-[#F0F0F0] text-[#00000099] border-gray-300 hover:bg-gray-200"
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Check if current product with selected options is already in cart
  const isInCart = cartItems.some(
    (item: any) =>
      item.id === product?.id &&
      item.size === selectedSize &&
      item.color === selectedColor
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
  useEffect(() => {
    if (product?.images?.length) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

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

      <div className="px-4 md:px-6 lg:px-8 xl:px-24 py-[90px] md:py-18 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Image Section */}
          <div className="w-full">
            {/* Mobile: Single main image */}
            <div className="block md:hidden">
              <div className="w-full aspect-square overflow-hidden">
                <img
                  src={selectedImage || product.images[0]}
                  alt={product.title}
                  className="rounded-2xl w-full h-full object-cover"
                />
              </div>
              {/* Mobile thumbnail strip */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto">
                  {product.images.slice(0, 4).map((img: string, i: number) => (
                    <div
                      key={i}
                      className="flex-shrink-0 w-16 h-16 overflow-hidden"
                    >
                      <img
                        src={img}
                        alt={`${product.title} view ${i + 1}`}
                        className={`rounded-xl w-full h-full object-cover cursor-pointer hover:opacity-80 transition ${selectedImage === img ? "ring-2 ring-black" : ""}`}
                        onClick={() => setSelectedImage(img)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tablet and Desktop: Side thumbnails + main image */}
            <div className="hidden md:flex gap-3 lg:gap-4">
              {/* Thumbnail column */}
              <div className="flex flex-col gap-3 flex-shrink-0">
                {(product.images || [])
                  .slice(0, 3)
                  .map((img: string, i: number) => (
                    <div
                      key={i}
                      className="w-16 h-20 md:w-20 md:h-24 lg:w-24 lg:h-32 overflow-hidden"
                    >
                      <img
                        src={img}
                        alt={`${product.title} view ${i + 1}`}
                        className={`
        rounded-xl w-full h-full object-cover cursor-pointer hover:opacity-80 transition
        ${selectedImage === img ? "ring-2 ring-black" : ""}
      `}
                        onClick={() => setSelectedImage(img)}
                      />
                    </div>
                  ))}
              </div>

              {/* Main image */}
              <div className="flex-1 max-w-md lg:max-w-lg">
                <div className="w-full aspect-[4/5] overflow-hidden">
                  <img
                    src={
                      selectedImage || product.images[0] || product.images?.[0]
                    }
                    alt={product.title}
                    className="rounded-2xl w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="w-full space-y-4 md:space-y-6">
            {/* Title and Price */}
            <div className="space-y-2">
              <h1 className="text-lg md:text-xl lg:text-2xl xl:text-navbar-h1 font-alfa leading-tight">
                {product.title}
              </h1>
              <span className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
                ${product.price}
              </span>
            </div>

            {/* Description */}
            <div className="pb-4 md:pb-6 border-b border-[#0000001A]">
              <p className="text-[#00000099] leading-relaxed text-sm md:text-base">
                {product.description}
              </p>
            </div>

            {/* Color Selection */}
            <div className="pb-4 md:pb-6 border-b border-[#0000001A]">
              <SelectionGroup
                title="Select Colors"
                options={colors}
                selected={selectedColor}
                onSelect={setSelectedColor}
                type="color"
              />
            </div>

            {/* Size Selection */}
            <div className="pb-4 md:pb-6 border-b border-[#0000001A]">
              <SelectionGroup
                title="Choose Size"
                options={sizes}
                selected={selectedSize}
                onSelect={setSelectedSize}
              />
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <div className="flex-shrink-0">
                <QuantitySelector quantity={quantity} onUpdate={setQuantity} />
              </div>
              <Button
                buttonText="Add to Cart"
                width="100%"
                className="flex-0 min-w-0"
                onClick={() => {
                  const cartItem = {
                    id: product.id,
                    name: product.title,
                    price: product.price,
                    image: product.images?.[0] || product.category?.image,
                    size: selectedSize,
                    color: selectedColor,
                    quantity,
                  };

                  dispatch(addItem(cartItem));
                  dispatch(
                    showToast({
                      message: isInCart
                        ? "Cart updated successfully!"
                        : "Product added to cart successfully!",
                      type: "success",
                    })
                  );
                  navigate("/");
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
