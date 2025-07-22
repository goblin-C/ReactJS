import { useState } from 'react';
import ProductItem from './ProductItem';

export default function ProductTable({ products, loading }) {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProducts(products.map((p) => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const allSelected = products.length > 0 && selectedProducts.length === products.length;

  return (
    <div className="flex flex-col flex-1 px-8 pt-2 overflow-hidden">
      {/* Top bar */}
      <div className="flex justify-between items-center p-2 border-b bg-white">
        <h1 className="text-3xl font-semibold text-gray-900">Products</h1>
        <div className="flex gap-2 items-center">
          <button className="relative flex items-center border px-3 py-1 rounded text-gray-700">
            <img src="/images/filter.svg" alt="Filter" className="mr-2" />
            Filter
          </button>
          <button className="flex items-center border px-3 py-1 rounded text-gray-700">
            <img src="/images/export.svg" alt="Export" className="mr-2" />
            Export
          </button>
          <button className="flex items-center bg-blue-500 text-white px-3 py-1 rounded">
            <img src="/images/add.svg" alt="Add" className="mr-2" />
            Add Product
          </button>
        </div>
      </div>

      {/* Scrollable table */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-full">Loading...</div>
        ) : (
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-white border-b">
              <tr>
                <th className="p-2 w-12">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-2 text-left">Image</th>
                <th className="px-2 max-w-xs text-left">Title</th>
                <th className="px-2 max-w-[350px] text-justify">Description</th>
                <th className="px-2 text-center">Price</th>
                <th className="px-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductItem
                    key={product.id}
                    product={product}
                    isSelected={selectedProducts.includes(product.id)}
                    onSelect={() => handleSelectOne(product.id)}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    No products available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
