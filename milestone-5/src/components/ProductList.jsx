import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

const productHeaders = [
  'checkbox',
  'image',
  'title',
  'description',
  'price',
  'actions'
];

export default function ProductList({
  products,
  currentPage = 1,
  pageCount = 1,
  onPageChange,
  onDeleteClick,
  user,
}) {
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState([]);

  const isAllSelected = products ? (selectedProducts.length === products.length) && products.length !== 0 : false;

  const handleHeaderCheckboxChange = () => {
    if (isAllSelected) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products?.map(product => product.id) || []);
    }
  };

  const handleProductCheckboxChange = (productId) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handlePageChange = (page) => {
    setSelectedProducts([]);
    onPageChange(page);
  };

  const handleEditClick = (productId) => {
    navigate(`/edit/${productId}`);
  };

  const handleDeleteButtonClick = (product) => {
    if (onDeleteClick) {
      onDeleteClick(product);
    }
  };

  return (
    <div className="pt-7 flex flex-col h-[calc(100vh-147px)] min-h-[400px]">
      <div className="flex-grow overflow-auto">
        <table className="table-fixed w-full border-collapse">
          <colgroup>
            <col className="w-12" />  {/* checkbox */}
            <col className="w-20" />  {/* image */}
            <col className="w-48" />  {/* title */}
            <col className="w-80" />  {/* description */}
            <col className="w-24" />  {/* price */}
            {user && <col className="w-24" />} {/* actions only if user */}
          </colgroup>
          <thead className="sticky top-0 bg-white z-10 shadow-[0_1px_0_0_#E5E9EB]">
            <tr>
              {productHeaders.map((header, index) => {
                if (header === 'actions' && !user) return null;
                return (
                  <th
                    key={index}
                    className="px-3 pb-[11px] text-tableHeader font-semibold text-[#84919A] uppercase align-middle text-left"
                  >
                    {header === 'checkbox' ? (
                      <input
                        type="checkbox"
                        className="h-3 w-3 rounded-[4px] border border-[#B0BABF] bg-[#F6F8F9] text-blue-600 focus:outline-none disabled:opacity-50"
                        checked={isAllSelected}
                        onChange={handleHeaderCheckboxChange}
                      />
                    ) : header.toUpperCase()}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {products?.length ? (
              products.map((record) => (
                <tr key={record.id} className="h-[64.2px] border-b border-[#E5E9EB]">
                  <td className="px-3 py-1">
                    <input
                      type="checkbox"
                      className="h-3 w-3 rounded-[4px] border border-[#B0BABF] bg-[#F6F8F9] text-blue-600 focus:outline-none disabled:opacity-50"
                      checked={selectedProducts.includes(record.id)}
                      onChange={() => handleProductCheckboxChange(record.id)}
                    />
                  </td>
                  <td className="px-3 pt-1 pb-2">
                    <img
                      className="h-12 w-12 rounded-[8px] object-cover"
                      src={record.images[0]}
                      alt={record.title}
                    />
                  </td>
                  <td className="px-3 py-1">
                    <div className="text-tableContent font-normal text-[#252C32] truncate">
                      {record.title}
                    </div>
                  </td>
                  <td className="px-3 py-1">
                    <div className="text-tableContent font-normal text-[#252C32] truncate">
                      {record.description}
                    </div>
                  </td>
                  <td className="px-3 py-1">
                    <div className="text-tableContent font-normal text-[#252C32] truncate">
                      ${record.price}
                    </div>
                  </td>
                  {user && (
                    <td className="px-3 py-1">
                      <div className="flex items-center gap-[22px]">
                        <button onClick={() => handleDeleteButtonClick(record)}>
                          <img src="images/delete.svg" alt="Delete" />
                        </button>
                        <button onClick={() => handleEditClick(record.id)}>
                          <img src="images/edit.svg" alt="Edit" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={user ? 6 : 5} className="text-center py-8 text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-auto">
        {products?.length > 0 && (
          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
