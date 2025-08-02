import { X, ChevronDown, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { hideSignUpBanner } from "../store/slices/uiSlice";
import useIsMobile from "../hooks/use-mobile";
import { useState } from "react";

export const Header = () => {
  const dispatch = useDispatch();
  const showSignUpOffer = useSelector((state: RootState) => state.ui.showSignUpBanner);
  const cartItems = useSelector((state: RootState) => state.cart.data || []);
  const handleCloseSignUpOffer = () => dispatch(hideSignUpBanner());
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Promotional Banner */}
      {showSignUpOffer && (
        <div className="bg-black text-white p-[0.75rem] text-center text-sm">
          <div className="flex items-center justify-center relative max-w-7xl mx-auto">
            <span>
              Sign up and get 20% off your first order.{" "}
              <span className="underline font-medium cursor-pointer">Sign Up Now</span>
            </span>
            <button className="absolute right-0 p-[0.25rem]">
              <X className="w-4 h-4" onClick={handleCloseSignUpOffer} />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="fixed w-full top-0 border-b border-gray-200 bg-white z-50 px-4 py-6 md:px-8 xl:px-24">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="font-alfa text-navbar-h1 font-bold flex-shrink-0"
          >
            <span className="block xl:hidden">FS</span>
            <span className="hidden xl:block">FAKESTORE</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 flex-1 justify-center">
            <div className="flex items-center space-x-1 cursor-pointer">
              <span className="text-navbar-menu-text">Shop</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <span className="text-navbar-menu-text cursor-pointer">On Sale</span>
            <span className="text-navbar-menu-text cursor-pointer">New Arrivals</span>
            <span className="text-navbar-menu-text cursor-pointer">Brands</span>
          </nav>

          <div className="flex items-center gap-3">
            {/* Desktop Search */}
            <div className="relative hidden lg:block">
              <img
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
                src="/search.svg"
                alt="search"
              />
              <input
                type="text"
                placeholder="Search for products..."
                className="pl-10 pr-4 py-3 w-60 lg:w-72 xl:w-96 bg-[#F0F0F0] border-0 rounded-full outline-none"
              />
            </div>
            
            {/* Cart */}
            <Link to="/cart" className="relative">
              <img className="w-7 h-7" src="/cart.svg" alt="cart" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            
            {/* Profile */}
            <button className="hidden md:block">
              <img className="w-7 h-7" src="/profile.svg" alt="profile" />
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobile && (
          <div
            className={`
              fixed top-3 left-0 w-full h-screen bg-white z-40
              transform transition-transform duration-100 ease-in-out
              ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <span className="font-alfa text-navbar-h1 font-bold">FS</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            {/* Mobile Search */}
            <div className="p-4 border-b">
              <div className="relative">
                <img
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                  src="/search.svg"
                  alt="search"
                />
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="pl-10 pr-4 py-3 w-full bg-[#F0F0F0] border-0 rounded-full outline-none"
                />
              </div>
            </div>
            
            {/* Mobile Menu Items */}
            <div className="flex flex-col p-4 space-y-6">
              <span className="text-navbar-menu-text cursor-pointer text-lg">Shop</span>
              <span className="text-navbar-menu-text cursor-pointer text-lg">On Sale</span>
              <span className="text-navbar-menu-text cursor-pointer text-lg">New Arrivals</span>
              <span className="text-navbar-menu-text cursor-pointer text-lg">Brands</span>
              
              <div className="pt-6 border-t">
                <button className="flex items-center gap-3">
                  <img className="w-6 h-6" src="/profile.svg" alt="profile" />
                  <span className="text-navbar-menu-text text-lg">Profile</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </header>
    </>
  );
};
