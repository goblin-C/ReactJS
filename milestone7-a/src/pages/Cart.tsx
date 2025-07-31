import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState, AppDispatch } from "../store";
import { Minus, Plus, Trash2, Tag, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Breadcrumb } from "../components/Breadcrumb";
import { Footer } from "../components/Footer";
import { updateQuantity, removeItem } from "../store/slices/cartSlice";

interface CartItemProps {
  item: any;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => (
  <div className="flex items-center space-x-3 lg:space-x-4 p-4 lg:p-6">
    <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex-1 space-y-2">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-base lg:text-lg">{item.name}</h3>
          {["size", "color"].map(
            (attr) =>
              item[attr] && (
                <p key={attr} className="text-sm text-gray-600">
                  {attr.charAt(0).toUpperCase() + attr.slice(1)}: {item[attr]}
                </p>
              )
          )}
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-700 p-1"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-product-card-price">${item.price}</span>
        <div className="flex items-center bg-gray-100 rounded-full">
          {[
            { icon: Minus, action: -1 },
            { icon: Plus, action: 1 },
          ]
            .map(({ icon: Icon, action }, idx) => {
              const isMinusDisabled = idx === 0 && item.quantity === 1;
              return (
                <button
                  key={idx}
                  onClick={() =>
                    onUpdateQuantity(item.id, item.quantity + action)
                  }
                  disabled={isMinusDisabled}
                  className={`p-2 rounded-full ${
                    isMinusDisabled
                      ? 'cursor-not-allowed opacity-50'
                      : 'hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              );
            })
            .reduce(
              (acc, btn, idx) => [
                ...acc,
                ...(idx === 1
                  ? [
                      <span key="qty" className="px-4 py-2 font-medium">
                        {item.quantity}
                      </span>,
                    ]
                  : []),
                btn,
              ],
              []
            )}
        </div>
      </div>
    </div>
  </div>
);

const OrderSummaryRow = ({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) => (
  <div className={`flex justify-between ${className}`}>
    <span className={className.includes("font-bold") ? "text-cart-price-details text-[#111111]" : "text-cart-price-details text-[#00000099]"}>
      {label}
    </span>
    <span
      className={
        className.includes("font-bold") ? "text-[#111111] text-product-card-price" : "text-product-card-title"
      }
    >
      {value}
    </span>
  </div>
);

export default function Cart() {
  const [promoCode, setPromoCode] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.data);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Cart', path: '/cart' }
  ]

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = subtotal * 0.2;
  const deliveryFee = cartItems.length > 0 ? 15 : 0;
  const total = subtotal - discount + deliveryFee;

  const summaryItems = [
    { label: "Subtotal", value: `$${subtotal}` },
    {
      label: "Discount (-20%)",
      value: `-$${discount.toFixed(0)}`,
      className: "text-red-600",
    },
    { label: "Delivery Fee", value: `$${deliveryFee}` },
    {
      label: "Total",
      value: `$${total.toFixed(0)}`,
      className: "font-bold",
    },
  ];

  return (
    <div>
      <div className="mt-[81px] bg-white z-40 py-4">
        <Breadcrumb items={breadcrumbs} />
        <div className="mx-[100px] pt-8">
          <h1 className="text-navbar-h1 font-alfa mb-8">Your cart</h1>
        </div>
      </div>

      <div className="mx-[100px] pb-[114px]">

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Trash2 className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
        <div className="flex flex-row gap-[20px]">
          <div className="flex-1">
            <div className="border border-gray-200 rounded-[20px]">
              {[...cartItems].reverse().map((item, index) => (
                <div key={item.id}>
                  <CartItem
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                  />
                  {index < cartItems.length - 1 && (
                    <div className="mx-6 border-b border-gray-200" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="w-[505px] space-y-6">
            <div className="border border-[#0000001A] rounded-[20px] p-6">
              <h2 className="text-product-card-price mb-6">Order Summary</h2>

              <div className="space-y-4">
                {summaryItems.slice(0, -1).map((item, idx) => (
                  <OrderSummaryRow key={idx} {...item} />
                ))}
                <div className="my-4 h-px bg-[#0000001A]" />
                <OrderSummaryRow {...summaryItems[summaryItems.length - 1]} />
              </div>

              <div className="mt-6">
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Add promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="pl-10 w-[326px] h-[48px] rounded-[62px] border-gray-300 bg-[#F0F0F0]"
                    />
                  </div>
                  <Button className="bg-black w-[119px] h-[48px] text-white px-6 rounded-full hover:bg-gray-800">
                    Apply
                  </Button>
                </div>
              </div>

              <Button className="w-full h-[60px] bg-black text-white py-4 rounded-full hover:bg-gray-800 mt-6 flex items-center justify-center space-x-2">
                <span>Go to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
