import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { getProducts } from '../services/productsService';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const limit = 10;

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const fetchProducts = async (page) => {
    const offset = page * limit;
    const data = await getProducts(limit, offset);
    setProducts(data);
    setPageCount(10); // Assume total 100 for now, or you can derive it from headers if available
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Products</h2>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border rounded text-sm text-gray-600">Filter</button>
          <button className="px-3 py-1 border rounded text-sm text-gray-600">Export</button>
          <button className="px-3 py-1 rounded text-sm bg-blue-600 text-white">Add Product</button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-gray-500">
              <th className="p-3"><input type="checkbox" /></th>
              <th className="p-3">Image</th>
              <th className="p-3">Title</th>
              <th className="p-3">Description</th>
              <th className="p-3">Price</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="p-3"><input type="checkbox" /></td>
                <td className="p-3">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-12 h-12 rounded object-cover"
                  />
                </td>
                <td className="p-3">{item.title}</td>
                <td className="p-3 text-gray-600">{item.description}</td>
                <td className="p-3 font-medium">${item.price}</td>
                <td className="p-3 flex gap-2">
                  <button>
                    <img src="/images/trash.svg" alt="delete" className="w-4 h-4" />
                  </button>
                  <button>
                    <img src="/images/edit.svg" alt="edit" className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <ReactPaginate
          previousLabel={'← Previous'}
          nextLabel={'Next →'}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={'flex items-center space-x-2 text-sm'}
          previousLinkClassName={'px-3 py-1 border rounded hover:bg-gray-100'}
          nextLinkClassName={'px-3 py-1 border rounded hover:bg-gray-100'}
          activeLinkClassName={'bg-blue-100 text-blue-600'}
          pageLinkClassName={'px-3 py-1 border rounded hover:bg-gray-100'}
          breakLabel={'...'}
        />
      </div>
    </div>
  );
};

export default ProductTable;
