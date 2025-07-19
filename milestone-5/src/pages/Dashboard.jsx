import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ProductTable from '../components/ProductTable';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 py-0 px-8 bg-white">
          <ProductTable />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
