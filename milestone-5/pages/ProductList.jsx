import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ProductHeader from "../src/components/ProductHeader";
import ProductList from "../src/components/ProductList";
import Toast from "../src/components/Toast";
import DeleteModal from "../src/components/DeleteModal";
import { getAPI, deleteAPI } from "../src/services/api";


export default function ProductListing({ searchText = '', user }) {
    const location = useLocation();
    const state = location.state || {};
    
    // Toast state
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');
    
    // Modal state
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [isModalLoading, setIsModalLoading] = useState(false);
    // Products state
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const limit = 10;
    
    // Check for toast message in navigation state
    useEffect(() => {
        if (state?.showToast && state?.toastMessage) {
            setShowToast(true);
            setToastMessage(state.toastMessage);
            setToastType(state.toastType || 'success');
            
            // Clear the state to prevent showing toast on refresh
            window.history.replaceState({}, document.title);
            
            // Auto-hide toast after 3 seconds
            setTimeout(() => {
                setShowToast(false);
            }, 5000);
        }
    }, [state]);

    // Reset to first page when search text changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchText]);

    // Fetch paginated products when page changes or search text changes
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null); // Reset error state
                const offset = (currentPage - 1) * limit;
                // Fetch the total count first
                const countResult = await getAPI(`products${searchText ? '?title=' + searchText : ''}`);
                setTotalPages(Math.ceil(countResult.data.length / limit));
                
                // Fetch products
                const apiEndpoint = `products?offset=${offset}&limit=${limit}${searchText ? '&title=' + searchText : ''}`;
                const res = await getAPI(apiEndpoint);
                
                setProducts(res.data);
            } catch (error) {
                // Proper error handling for TypeScript
                const errorMessage = error ? error.message : 'An unknown error occurred';
                setError(errorMessage);
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchProducts();
    }, [currentPage, searchText, refreshTrigger]);

    // Handle delete button click - callback from ProductList
    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        setShowDeleteModal(true);
    };

    // Handle modal close - delay clearing product data
    const handleCloseModal = () => {
        setShowDeleteModal(false);
        setTimeout(() => {
            setProductToDelete(null);
        }, 500);
    };

    // Handle actual delete
    const handleConfirmDelete = async () => {
        if (productToDelete) {
            try {
                setIsModalLoading(true);
                await deleteAPI(`products/${productToDelete.id}`);
                
                // Close modal and show success toast
                handleCloseModal();
                
                // Reset to first page after deletion
                setCurrentPage(1);
                
                // Show success toast
                setToastMessage('Product deleted successfully!');
                setToastType('success');
                setShowToast(true);
                
                // Auto-hide toast after 3 seconds
                setTimeout(() => {
                    setShowToast(false);
                }, 3000);
                
                // Refresh products list by triggering useEffect
                setRefreshTrigger(prev => prev + 1);
            } catch (error) {
                console.error('Error deleting product:', error);
                setToastMessage('Failed to delete product');
                setToastType('error');
                setShowToast(true);
                
                // Auto-hide error toast after 3 seconds
                setTimeout(() => {
                    setShowToast(false);
                }, 3000);
            } finally {
                setIsModalLoading(false);
            }
        }
    };

    const handleCloseToast = () => {
        setShowToast(false);
    };

    // Handle loading state
    if (loading) {
        return (
            <div className="ml-10 mr-[29px]">
                <div className="flex justify-center items-center h-64 text-gray-500">
                    <p>Your Products are being loaded...</p>
                </div>
            </div>
        );
    }

    // Handle error state
    if (error) {
        return (
            <div className="ml-10 mr-[29px]">
                <div className="flex justify-center items-center h-64">
                    <p className="text-red-500">Error: {error}</p>
                </div>
            </div>
        );
    }

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    
    return (
        <div className="ml-10 mr-[29px] relative">
            {showToast && (
                <div className="fixed top-3 right-3 z-50 animate-slide-in-right">
                    <Toast 
                        message={toastMessage} 
                        type={toastType}
                        onClose={handleCloseToast}
                    />
                </div>
            )}
            
            <DeleteModal user={user}
                isModalOpen={showDeleteModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                productName={productToDelete?.title || ''}
                loading={isModalLoading}
            />
            <ProductHeader user={user}/>
            <ProductList user={user}
                products={products} 
                currentPage={currentPage} 
                pageCount={totalPages} 
                onPageChange={handlePageChange}
                onDeleteClick={handleDeleteClick}
            />
        </div>
    );
}