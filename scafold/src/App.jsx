import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import AddProductPage from './pages/AddProductPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/add" element={<AddProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
