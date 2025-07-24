import { useState, useEffect } from "react";
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import ProductTable from "../components/ProductTable";
import Pagination from "../components/Pagination";
import { getProducts } from "../services/productService";
import axios from "axios";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  const totalPages = Math.ceil(totalCount / limit);

  useEffect(() => {
    const offset = (currentPage - 1) * limit;
    setLoading(true);
    getProducts(offset, limit)
      .then((res) => setProducts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [currentPage]);

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((res) => setTotalCount(res.data.length))
      .catch(console.error);
  }, []);

  return (
    <div className="flex h-screen">
      <SideNav />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="flex-1 flex flex-col overflow-hidden">
          <ProductTable
            products={products}
            loading={loading}
            onDeleteSuccess={() => {
              // Refetch after deletion
              const offset = (currentPage - 1) * limit;
              getProducts(offset, limit)
                .then((res) => setProducts(res.data))
                .catch(console.error);
            }}
          />

          <div className="border-t bg-white">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
