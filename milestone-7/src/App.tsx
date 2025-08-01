import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from "../store";
import { Header } from '../components/Header'

import Homepage from '../components/main_component'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'

function App() {
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
        </div>
      </Router>
    </PersistGate >
  )
}

export default App