import { X, Search, ShoppingCart, User, ChevronDown, Star } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"

export default function HomePage() {
  const newArrivals = [
    {
      id: 1,
      name: "T-shirt with Tape Details",
      price: 120,
      image: "/placeholder.svg?height=300&width=250",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Skinny Fit Jeans",
      price: 240,
      originalPrice: 260,
      image: "/placeholder.svg?height=300&width=250",
      rating: 3.5,
    },
    {
      id: 3,
      name: "Checkered Shirt",
      price: 180,
      image: "/placeholder.svg?height=300&width=250",
      rating: 4.5,
    },
    {
      id: 4,
      name: "Sleeve Striped T-shirt",
      price: 130,
      originalPrice: 160,
      image: "/placeholder.svg?height=300&width=250",
      rating: 4.5,
    },
  ]

  const casualProducts = [
    {
      id: 1,
      name: "Vertical Striped Shirt",
      price: 212,
      originalPrice: 232,
      image: "/placeholder.svg?height=250&width=200",
    },
    { id: 2, name: "Courage Graphic T-shirt", price: 145, image: "/placeholder.svg?height=250&width=200" },
    { id: 3, name: "Loose Fit Bermuda Shorts", price: 80, image: "/placeholder.svg?height=250&width=200" },
    { id: 4, name: "Faded Skinny Jeans", price: 210, image: "/placeholder.svg?height=250&width=200" },
    { id: 5, name: "Gradient Graphic T-shirt", price: 212, image: "/placeholder.svg?height=250&width=200" },
    { id: 6, name: "Polo with Tipping Details", price: 145, image: "/placeholder.svg?height=250&width=200" },
    { id: 7, name: "Black Striped T-shirt", price: 80, image: "/placeholder.svg?height=250&width=200" },
    { id: 8, name: "Skinny Fit Jeans", price: 210, image: "/placeholder.svg?height=250&width=200" },
  ]

  const styleCategories = [
    { name: "Casual", image: "/placeholder.svg?height=200&width=300" },
    { name: "Formal", image: "/placeholder.svg?height=200&width=300" },
    { name: "Party", image: "/placeholder.svg?height=200&width=300" },
    { name: "Gym", image: "/placeholder.svg?height=200&width=300" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Promotional Banner */}
      <div className="bg-black text-white py-3 px-4 text-center text-sm">
        <div className="flex items-center justify-center relative max-w-7xl mx-auto">
          <span>
            Sign up and get 20% off to your first order.{" "}
            <span className="underline font-medium cursor-pointer">Sign Up Now</span>
          </span>
          <button className="absolute right-0 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-gray-200 py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold text-black">FAKESTORE</div>

          <nav className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-1 cursor-pointer">
              <span className="text-gray-700">Shop</span>
              <ChevronDown className="w-4 h-4 text-gray-700" />
            </div>
            <span className="text-gray-700 cursor-pointer">On Sale</span>
            <span className="text-gray-700 cursor-pointer">New Arrivals</span>
            <span className="text-gray-700 cursor-pointer">Brands</span>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search for products..."
                className="pl-10 pr-4 py-2 w-80 bg-gray-100 border-0 rounded-full"
              />
            </div>
            <button className="p-2">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2">
              <User className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-black leading-tight">
              FIND CLOTHES
              <br />
              THAT MATCH YOUR
              <br />
              STYLE PERFECTLY
            </h1>

            <p className="text-gray-600 text-lg max-w-lg">
              Browse through our diverse range of meticulously crafted garments, designed to bring out your
              individuality and cater to your sense of style.
            </p>

            <Button className="bg-black text-white px-12 py-6 text-lg rounded-full hover:bg-gray-800">Shop Now</Button>

            <div className="flex flex-wrap gap-8 pt-8">
              <div>
                <div className="text-3xl font-bold text-black">200+</div>
                <div className="text-gray-600">International Brands</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-black">2,000+</div>
                <div className="text-gray-600">High-Quality Products</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-black">30,000+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="/placeholder.svg?height=600&width=500"
              alt="Fashion models wearing stylish clothing"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Brand Section */}
      <section className="bg-black py-12 px-4">
        <div className="max-w-7xl mx-auto flex justify-center items-center space-x-16 flex-wrap gap-8">
          <div className="text-white text-2xl font-bold tracking-wider">VERSACE</div>
          <div className="text-white text-2xl font-bold tracking-wider">ZARA</div>
          <div className="text-white text-2xl font-bold tracking-wider">GUCCI</div>
          <div className="text-white text-2xl font-bold tracking-wider">GUCCI</div>
          <div className="text-white text-2xl font-bold tracking-wider">PRADA</div>
          <div className="text-white text-2xl font-bold tracking-wider">Calvin Klein</div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-black text-center mb-12">NEW ARRIVALS</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>

                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">{product.rating}/5</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" className="px-8 py-3 rounded-full border-gray-300 bg-transparent">
              View All
            </Button>
          </div>
        </div>
      </section>

      {/* Casual Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-black text-center mb-12">CASUAL</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {casualProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="bg-white rounded-lg overflow-hidden mb-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>

                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Style Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-black text-center mb-12">BROWSE BY STYLE</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {styleCategories.map((category, index) => (
              <div key={index} className="relative group cursor-pointer overflow-hidden rounded-lg">
                <div className="bg-gray-100 h-64 flex items-center justify-center">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
            {/* Company Info */}
            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold mb-4">FAKESTORE</h3>
              <p className="text-gray-600 text-sm mb-4">
                We have clothes that suits your style and which you're proud to wear. From women to men.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-black rounded-full"></div>
                <div className="w-8 h-8 bg-black rounded-full"></div>
                <div className="w-8 h-8 bg-black rounded-full"></div>
                <div className="w-8 h-8 bg-black rounded-full"></div>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold mb-4">COMPANY</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-black">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Career
                  </a>
                </li>
              </ul>
            </div>

            {/* Help Links */}
            <div>
              <h4 className="font-semibold mb-4">HELP</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-black">
                    Customer Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Delivery Details
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* FAQ Links */}
            <div>
              <h4 className="font-semibold mb-4">FAQ</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-black">
                    Account
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Manage Deliveries
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Orders
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Payments
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="font-semibold mb-4">RESOURCES</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-black">
                    Free eBooks
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Development Tutorial
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    How to - Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-black">
                    Youtube Playlist
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-300 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">Shop.co © 2000-2023, All Rights Reserved</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <div className="w-8 h-5 bg-gray-300 rounded"></div>
              <div className="w-8 h-5 bg-gray-300 rounded"></div>
              <div className="w-8 h-5 bg-gray-300 rounded"></div>
              <div className="w-8 h-5 bg-gray-300 rounded"></div>
              <div className="w-8 h-5 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}