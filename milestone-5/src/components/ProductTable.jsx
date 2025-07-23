import { useState, useEffect } from "react";
import ProductItem from "./ProductItem";
import { getProducts, totalProducts } from "../services/productService";

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setTotalCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 10;

useEffect(() => {
  const fetchTotalCount = async () => {
    setLoading(true);
    try {
      const response = await totalProducts();
      setTotalCount(response.data.length);
    } catch (err) {
      console.error('Failed to fetch total count:', err);
    } finally {
      setLoading(false);
    }
  };

  fetchTotalCount();
}, [])

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const offset = (currentPage - 1) * limit;
      const response = await getProducts(offset, limit);
      setProducts(response.data); 
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, [currentPage]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = products.map((p) => p.id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const isAllSelected =
    products.length > 0 && selectedIds.length === products.length;

  return (
    <div className="flex flex-col flex-1 px-8 pt-2 overflow-hidden">
      <div className="flex justify-between items-center p-2 mt-5 mb-2 border-b bg-white">
        <h1 className="text-4xl font-bold">Products</h1>
        <div className="flex gap-4 items-center">
          <button className="relative flex items-center gap-2 border px-4 py-1 rounded-md font-inter font-normal text-sm text-gray-700">
            {/* Filter SVG */}
            <svg
              width="14"
              height="16"
              viewBox="0 0 14 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H13C13.2652 0 13.5196 0.105357 13.7071 0.292893C13.8946 0.48043 14 0.734784 14 1V4C13.9999 4.26519 13.8946 4.51951 13.707 4.707L9 9.414V13C8.99994 13.2652 8.89455 13.5195 8.707 13.707L6.707 15.707C6.56715 15.8468 6.38898 15.942 6.19503 15.9806C6.00108 16.0192 5.80005 15.9993 5.61735 15.9237C5.43465 15.848 5.27848 15.7199 5.1686 15.5555C5.05871 15.391 5.00004 15.1978 5 15V9.414L0.293 4.707C0.105451 4.51951 5.66374e-05 4.26519 0 4V1Z"
                fill="#5B6871"
              />
            </svg>
            Filter
          </button>
          <button className="flex items-center border gap-2 px-4 py-1 rounded-md font-inter font-normal text-sm text-gray-700">
            {/* Export SVG */}
            <svg
              width="14"
              height="16"
              viewBox="0 0 14 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.292786 7.70703C0.105315 7.5195 0 7.26519 0 7.00003C0 6.73487 0.105315 6.48056 0.292786 6.29303L6.29279 0.293031C6.48031 0.105559 6.73462 0.000244141 6.99979 0.000244141C7.26495 0.000244141 7.51926 0.105559 7.70679 0.293031L13.7068 6.29303C13.8889 6.48163 13.9897 6.73423 13.9875 6.99643C13.9852 7.25863 13.88 7.50944 13.6946 7.69485C13.5092 7.88026 13.2584 7.98543 12.9962 7.9877C12.734 7.98998 12.4814 7.88919 12.2928 7.70703L7.99979 3.41403V15C7.99979 15.2652 7.89443 15.5196 7.70689 15.7071C7.51936 15.8947 7.265 16 6.99979 16C6.73457 16 6.48022 15.8947 6.29268 15.7071C6.10514 15.5196 5.99979 15.2652 5.99979 15V3.41403L1.70679 7.70703C1.51926 7.8945 1.26495 7.99982 0.999786 7.99982C0.734622 7.99982 0.480314 7.8945 0.292786 7.70703Z"
                fill="#5B6871"
              />
            </svg>
            Export
          </button>
          <button className="flex items-center bg-blue-500 gap-1 text-white px-3 py-1 font-inter font-normal text-sm rounded-md">
            {/* Plus SVG */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289C12.8946 7.48043 13 7.73478 13 8V11H16C16.2652 11 16.5196 11.1054 16.7071 11.2929C16.8946 11.4804 17 11.7348 17 12C17 12.2652 16.8946 12.5196 16.7071 12.7071C16.5196 12.8946 16.2652 13 16 13H13V16C13 16.2652 12.8946 16.5196 12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071C11.1054 16.5196 11 16.2652 11 16V13H8C7.73478 13 7.48043 12.8946 7.29289 12.7071C7.10536 12.5196 7 12.2652 7 12C7 11.7348 7.10536 11.4804 7.29289 11.2929C7.48043 11.1054 7.73478 11 8 11H11V8C11 7.73478 11.1054 7.48043 11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7Z"
                fill="white"
              />
            </svg>
            Add Product
          </button>
        </div>
      </div>

      {/* Scrollable table container */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            Loading...
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-white border-b">
              <tr>
                <th className="p-2 text-left">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="p-2 text-left text-[#84919A] font-inter font-semibold text-xs uppercase">Image</th>
                <th className="p-2 text-left text-[#84919A] font-inter font-semibold text-xs uppercase">TITLE</th>
                <th className="p-2 text-left text-[#84919A] font-inter font-semibold text-xs uppercase">DESCRIPTION</th>
                <th className="p-2 text-center text-[#84919A] font-inter font-semibold text-xs uppercase">PRICE</th>
                <th className="p-2 text-center text-[#84919A] font-inter font-semibold text-xs uppercase">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductItem
                    key={product.id}
                    product={product}
                    isSelected={selectedIds.includes(product.id)}
                    onSelect={() => handleSelectOne(product.id)}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-2 text-[#84919A] font-inter font-semibold text-xs uppercase4">
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
