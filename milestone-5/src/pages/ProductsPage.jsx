import Header from '../components/Header';
import SideNav from '../components/SideNav';
import ProductTable from '../components/ProductTable';

export default function ProductsPage() {
  return (
    <div className="flex h-screen">
      <SideNav />
      <div className="flex flex-col flex-1">
        <Header />
        <ProductTable />
      </div>
    </div>
  );
}
