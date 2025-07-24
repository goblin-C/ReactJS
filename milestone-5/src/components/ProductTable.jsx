import { useState } from "react";
import ProductItem from "./ProductItem";
import Toast from "./Toast";
import Modal from "./Modal";
import { deleteProduct } from "../services/productService";
import { useNavigate } from 'react-router-dom';

// inside component
export default function ProductTable({ products, loading, onDeleteSuccess }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const navigate = useNavigate();

  const handleSelectAll = (e) => {
    setSelectedIds(e.target.checked ? products.map((p) => p.id) : []);
  };

  const handleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    try {
      await deleteProduct(productToDelete.id);
      setToastMessage("Product deleted successfully");
      onDeleteSuccess(); // ✅ trigger reload in parent
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      setToastMessage("Failed to delete product");
    } finally {
      setShowModal(false);
      setProductToDelete(null);
    }
  };

  const isAllSelected =
    products.length > 0 && selectedIds.length === products.length;

  return (
    <div className="flex flex-col flex-1 px-8 pt-2 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-2 mt-5 mb-2 border-b bg-white">
        <h1 className="text-4xl font-bold">Products</h1>
        <div className="flex gap-4 items-center">
          <button className="flex items-center gap-2 border px-4 py-1 rounded-md font-inter text-sm text-gray-700">
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 1C0 0.73 0.11 0.48 0.29 0.29C0.48 0.11 0.73 0 1 0H13C13.27 0 13.52 0.11 13.71 0.29C13.89 0.48 14 0.73 14 1V4C14 4.27 13.89 4.52 13.71 4.71L9 9.41V13C9 13.27 8.89 13.52 8.71 13.71L6.71 15.71C6.39 16.03 5.89 16.03 5.56 15.71C5.22 15.39 5 15 5 14.59V9.41L0.29 4.71C0.11 4.52 0 4.27 0 4V1Z"
                fill="#5B6871"
              />
            </svg>
            Filter
          </button>

          <button className="flex items-center gap-2 border px-4 py-1 rounded-md font-inter text-sm text-gray-700">
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.29 7.71C0.11 7.52 0 7.27 0 7C0 6.73 0.11 6.48 0.29 6.29L6.29 0.29C6.48 0.11 6.73 0 7 0C7.27 0 7.52 0.11 7.71 0.29L13.71 6.29C13.89 6.48 14 6.73 14 7C14 7.27 13.89 7.52 13.71 7.71C13.52 7.89 13.27 8 13 8C12.73 8 12.48 7.89 12.29 7.71L8 3.41V15C8 15.27 7.89 15.52 7.71 15.71C7.52 15.89 7.27 16 7 16C6.73 16 6.48 15.89 6.29 15.71C6.11 15.52 6 15.27 6 15V3.41L1.71 7.71C1.52 7.89 1.27 8 1 8C0.73 8 0.48 7.89 0.29 7.71Z"
                fill="#5B6871"
              />
            </svg>
            Export
          </button>

          <button
                onClick={() => navigate('/add')} 
                className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 text-sm font-inter rounded-md">
            <svg width="24" height="24" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 7C12.27 7 12.52 7.11 12.71 7.29C12.89 7.48 13 7.73 13 8V11H16C16.27 11 16.52 11.11 16.71 11.29C16.89 11.48 17 11.73 17 12C17 12.27 16.89 12.52 16.71 12.71C16.52 12.89 16.27 13 16 13H13V16C13 16.27 12.89 16.52 12.71 16.71C12.52 16.89 12.27 17 12 17C11.73 17 11.48 16.89 11.29 16.71C11.11 16.52 11 16.27 11 16V13H8C7.73 13 7.48 12.89 7.29 12.71C7.11 12.52 7 12.27 7 12C7 11.73 7.11 11.48 7.29 11.29C7.48 11.11 7.73 11 8 11H11V8C11 7.73 11.11 7.48 11.29 7.29C11.48 7.11 11.73 7 12 7Z"
                fill="white"
              />
            </svg>
            Add Product
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto scroll-smooth">
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
                <th className="p-2 text-left text-[#84919A] font-inter font-semibold text-xs uppercase">
                  Image
                </th>
                <th className="p-2 text-left text-[#84919A] font-inter font-semibold text-xs uppercase">
                  Title
                </th>
                <th className="p-2 text-left text-[#84919A] font-inter font-semibold text-xs uppercase">
                  Description
                </th>
                <th className="p-2 text-center text-[#84919A] font-inter font-semibold text-xs uppercase">
                  Price
                </th>
                <th className="p-2 text-center text-[#84919A] font-inter font-semibold text-xs uppercase">
                  Actions
                </th>
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
                    onDelete={handleDeleteClick}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-2 text-[#84919A]">
                    No products available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <Modal
        visible={showModal}
        productTitle={productToDelete?.title}
        onCancel={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
      />

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}
