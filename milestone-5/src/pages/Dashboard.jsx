import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-4">
          <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
