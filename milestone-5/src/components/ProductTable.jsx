import { useEffect, useState } from 'react';
import { getProducts } from '../services/productService';
import ProductItem from './ProductItem';
import Pagination from './Pagination';

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  useEffect(() => {
    getProducts(offset, limit).then(res => setProducts(res.data));
  }, [offset]);

  return (
    <div className="flex flex-col flex-1">
      <div className="flex justify-between p-4">
        <div className="flex gap-2">
          <button className="border px-3 py-1">Filter</button>
          <button className="border px-3 py-1">Export</button>
          <button className="bg-blue-500 text-white px-3 py-1 rounded">Add Product</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-white border-b">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Image</th>
              <th className="p-2">Title</th>
              <th className="p-2">Description</th>
              <th className="p-2">Price</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map(product => <ProductItem key={product.id} product={product} />)
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">No products available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination offset={offset} setOffset={setOffset} limit={limit} />
    </div>
  );
}
