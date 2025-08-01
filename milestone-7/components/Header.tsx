import { Search, ShoppingCart, User, ChevronDown, X } from "lucide-react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../store"
import { hideSignUpBanner } from "../store/slices/uiSlice"

export const Header = () => {
  const dispatch = useDispatch()
  const showSignUpOffer = useSelector((state: RootState) => state.ui.showSignUpBanner)
  const cartItems = useSelector((state: RootState) => state.cart.data || [])
  const handleCloseSignUpOffer = () => dispatch(hideSignUpBanner())
  return (
    <>
      {/* Promotional Banner */}
      {
        showSignUpOffer && 
        <div className="bg-black text-white py-3 px-4 text-center text-sm">
        <div className="flex items-center justify-center relative max-w-7xl mx-auto">
          <span>
            Sign up and get 20% off to your first order.{" "}
            <span className="underline font-medium cursor-pointer">Sign Up Now</span>
          </span>
          <button className="absolute right-0 p-1">
            <X className="w-4 h-4" onClick={handleCloseSignUpOffer} />
          </button>
        </div>
      </div>}

      {/* Header */}
      <header className="sticky top-0 border-b border-gray-200 py-6 px-8 lg:px-16 xl:px-[100px] bg-white z-50">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-alfa text-navbar-h1 font-bold flex-shrink-0 mr-4 lg:mr-8">FAKESTORE</Link>

          <nav className="hidden md:flex items-center gap-4 lg:gap-6 flex-1 justify-center">
            <div className="flex items-center space-x-1 cursor-pointer">
              <span className="text-navbar-menu-text">Shop</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <span className="text-navbar-menu-text cursor-pointer">On Sale</span>
            <span className="text-navbar-menu-text cursor-pointer">New Arrivals</span>
            <span className="text-navbar-menu-text cursor-pointer">Brands</span>
          </nav>

          <div className="flex items-center flex-shrink-0 ml-auto">
            <div className="relative hidden md:block">
              <img className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#00000066] w-6 h-6" src='/search.svg' />
              <input
                type="text"
                placeholder="Search for products..."
                className="pl-10 pr-4 py-3 w-[250px] lg:w-[300px] xl:w-[505px] bg-[#F0F0F0] border-0 rounded-[62px] outline-none mr-4 lg:mr-6 xl:mr-10"
              />
            </div>
            <Link to="/cart" className="pr-3 lg:pr-[14px] relative">
              <img className="w-7 h-7 lg:w-6 lg:h-6" src='/cart.svg' />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 left-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <button>
              <img className="w-7 h-7 lg:w-6 lg:h-6" src='/profile.svg' />
            </button>
          </div>
        </div>
      </header>
    </>
  )
}