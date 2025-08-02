import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { RootState, AppDispatch } from "../store";
import { HeroSection } from "./HeroSection"
import { BrandSection } from "./BrandSection"
import { ProductSection } from "./ProductSection"
import { StyleSection } from "./StyleSection"
import { Footer } from "./Footer"
import ToastMessage from "./ToastMessage"
import { fetchList } from '../store/slices/productSlice'
import { hideToast } from "../store/slices/uiSlice"

const Homepage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const products = useSelector((state: RootState) => state.products)
  const toast = useSelector((state: RootState) => state.ui.toast)
  useEffect(() => {
    const url: string =  'products'
    dispatch(fetchList(url)) 
  }, [])
  
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        dispatch(hideToast())
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [toast.show, dispatch])  
  if (products.loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Loading...</p>
        </div>
      </div>
    )
  }
  
  const newArrivals = products.data?.slice(0, 4) || []
  const casualProducts = products.data?.slice(4, 16) || []
  return (
    <div>
      <HeroSection />
      <BrandSection />
      <ProductSection 
        title="NEW ARRIVALS" 
        products={newArrivals} 
      />
      <ProductSection 
        title="CASUAL" 
        products={casualProducts} 
      />
      <StyleSection />
      <Footer />
      
      {/* Toast Message */}
      {toast.show && (
        <div className="fixed top-6 right-6 z-100 p-4">
          <ToastMessage 
            message={toast.message}
            type={toast.type} 
            onClose={() => dispatch(hideToast())}
          />
        </div>
      )}
    </div>
  )
}

export default Homepage