import { Route, Routes, BrowserRouter } from 'react-router-dom';
import ProductListing from '../../pages/ProductList';
import AddProduct from '../components/AddProduct';

export default function AppRoutes({ searchText }) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProductListing searchText={searchText} />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/edit/:productId" element={<AddProduct />} />
            </Routes>
        </BrowserRouter>
    );
}