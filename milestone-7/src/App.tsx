import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react';
import { useDispatch, useSelector } from "react-redux";
import { persistor } from "./store";
import { RootState } from "./store";
import { hideToast } from "./store/slices/uiSlice";
import { Header } from './components/Header'
import ToastMessage from './components/ToastMessage';

import Homepage from './components/main_component'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'

function App() {
  const dispatch = useDispatch();
  const toast = useSelector((state: RootState) => state.ui.toast);

  return (
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <div className="min-h-screen bg-white">
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>

          {/* Toast Message */}
          {toast.show && (
            <div className="fixed top-6 right-6 z-50 p-4">
              <ToastMessage
                message={toast.message}
                type={toast.type}
                onClose={() => dispatch(hideToast())}
              />
            </div>
          )}
        </div>
      </Router>
    </PersistGate>
  )
}

export default App;
