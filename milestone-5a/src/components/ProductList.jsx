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
}) {
    const navigate = useNavigate();
    // State to store selected product IDs
    const [selectedProducts, setSelectedProducts] = useState([]);
    
    // Check if all products are selected
    const isAllSelected = products ? (selectedProducts.length === products.length) && products.length != 0 : false;
    
    // Handle header checkbox (select/deselect all)
    const handleHeaderCheckboxChange = () => {
        if (isAllSelected) {
            // Deselect all
            setSelectedProducts([]);
        } else {
            // Select all
            setSelectedProducts(products?.map(product => product.id) || []);
        }
    };
    
    // Handle individual product checkbox
    const handleProductCheckboxChange = (productId) => {
        setSelectedProducts(prev => {
            if (prev.includes(productId)) {
                // Remove from selection
                return prev.filter(id => id !== productId);
            } else {
                // Add to selection
                return [...prev, productId];
            }
        });
    };
    
    // Handler to change the page
    const handlePageChange = (page) => {
        // Clear selections when changing page
        setSelectedProducts([]);
        // Call the parent's onPageChange handler
        onPageChange(page);
    };

    // Handle edit button click
    const handleEditClick = (productId) => {
        navigate(`/edit/${productId}`);
    };

    // Handle delete button click
    const handleDeleteButtonClick = (product) => {
        if (onDeleteClick) {
            onDeleteClick(product);
        }
    };
    
    return (
        <div className="pt-7 flex flex-col h-[calc(100vh-147px)] min-h-[400px]">
            {/* Table headers */}
            <div className="flex-grow overflow-auto">
                <table className="table-fixed w-full border-collapse">
                    <colgroup>
                        <col className="w-12"/>
                        <col className="w-20"/>
                        <col className="w-48"/>
                        <col className="w-80"/>
                        <col className="w-24"/>
                        <col className="w-24"/>
                    </colgroup>
                    <thead className="sticky top-0 bg-white z-10 shadow-[0_1px_0_0_#E5E9EB]">
                        <tr>
                            {productHeaders.map((header, index) => (
                                <th key={index} className="px-3 pb-[11px] text-table-header-text text-table-header-text-color text-left">
                                    {header === 'checkbox' ?
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded-[4px] border border-[#B0BABF] bg-[#F6F8F9] text-blue-600 focus:outline-none disabled:opacity-50"
                                        checked={isAllSelected}
                                        onChange={handleHeaderCheckboxChange}
                                    />
                                    : header.toUpperCase()}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    {/* Table rows */}
                    <tbody>
                        {products?.length ? (
                            products.map((record) => (
                                <tr key={record.id} className="h-[64.2px]">
                                    <td className="px-3 py-1">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded-[4px] border border-[#B0BABF] bg-[#F6F8F9] text-blue-600 focus:outline-none disabled:opacity-50"
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
                                        <div className="truncate">
                                            {record.title}
                                        </div>
                                    </td>
                                    <td className="px-3 py-1">
                                        <div className="truncate text-sm text-gray-600">
                                            {record.description}
                                        </div>
                                    </td>
                                    <td className="px-3 py-1">
                                        <div className="truncate">
                                            ${record.price}
                                        </div>
                                    </td>
                                    <td className="px-3 py-1">
                                        <div className='flex items-center gap-[22px]'>
                                            <button onClick={() => handleDeleteButtonClick(record)}>
                                                <img src='images/delete.svg'/>
                                            </button>
                                            <button onClick={() => handleEditClick(record.id)}>
                                                <img src='images/edit.svg'/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center py-8 text-gray-500">
                                    No products found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mt-auto">
                {products?.length > 0 && <Pagination currentPage={currentPage} pageCount={pageCount} onPageChange={handlePageChange} />}
            </div>
        </div>
    );
}