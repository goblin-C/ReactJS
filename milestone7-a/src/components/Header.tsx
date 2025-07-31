import { X, ChevronDown, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { hideSignUpBanner } from "../store/slices/uiSlice";
import { useIsMobile } from "../hooks/use-mobile";
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
      <header className="fixed w-full top-0 border-b border-gray-200 bg-white z-50 p-[1.5rem] md:px-[2rem] xl:px-[6rem]">
        <div className="flex items-center justify-between flex-wrap">
          <Link
            to="/"
            className="font-alfa text-navbar-h1 font-bold flex-shrink-0 mr-[1rem] lg:mr-[2rem]"
          >
            <span className="block md:hidden">FS</span>
            <span className="hidden md:block">FAKESTORE</span>
          </Link>

          {isMobile ? (
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu className="w-6 h-6" />
            </button>
          ) : (
            <nav className="flex items-center gap-[1rem] lg:gap-[1.5rem] flex-1 justify-center">
              <div className="flex items-center space-x-[0.25rem] cursor-pointer">
                <span className="text-navbar-menu-text">Shop</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <span className="text-navbar-menu-text cursor-pointer">On Sale</span>
              <span className="text-navbar-menu-text cursor-pointer">New Arrivals</span>
              <span className="text-navbar-menu-text cursor-pointer">Brands</span>
            </nav>
          )}

          <div className="flex items-center flex-shrink-0 ml-auto">
            {!isMobile && (
              <div className="relative">
                <img
                  className="absolute left-[0.75rem] top-1/2 transform -translate-y-1/2 w-[1.5rem] h-[1.5rem]"
                  src="/search.svg"
                  alt="search"
                />
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="pl-[2.5rem] pr-[1rem] py-[0.75rem] w-[15rem] lg:w-[18.75rem] xl:w-[31.5rem] bg-[#F0F0F0] border-0 rounded-[3.875rem] outline-none mr-[1rem] lg:mr-[1.5rem] xl:mr-[2.5rem]"
                />
              </div>
            )}
            <Link to="/cart" className="pr-[0.75rem] lg:pr-[0.875rem] relative">
              <img className="w-[1.75rem] h-[1.75rem] lg:w-[1.5rem] lg:h-[1.5rem]" src="/cart.svg" alt="cart" />
              {cartItems.length > 0 && (
                <span className="absolute -top-[0.5rem] left-[0.75rem] bg-red-500 text-white text-xs rounded-full w-[1.25rem] h-[1.25rem] flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <button>
              <img className="w-[1.75rem] h-[1.75rem] lg:w-[1.5rem] lg:h-[1.5rem]" src="/profile.svg" alt="profile" />
            </button>
          </div>
        </div>

        {/* Mobile nav list */}
{isMobile && (
  <div
    className={`
      mt-[1rem] flex flex-col gap-4 absolute bg-[#ccc] p-4 left-0 top-16
      transition-transform duration-500 ease-in z-50 h-[100vh]
      ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
    `}
  >
    <span className="text-navbar-menu-text cursor-pointer">Shop</span>
    <span className="text-navbar-menu-text cursor-pointer">On Sale</span>
    <span className="text-navbar-menu-text cursor-pointer">New Arrivals</span>
    <span className="text-navbar-menu-text cursor-pointer">Brands</span>
  </div>
)}

      </header>
    </>
  );
};
