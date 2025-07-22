<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
=======
import ProductsPage from './pages/ProductsPage';

function App() {
  return <ProductsPage />;
>>>>>>> 3b4e9c1602e803002ac9d5c42decef78627b5d1b
}

export default App;
