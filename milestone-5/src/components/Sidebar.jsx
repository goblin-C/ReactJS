import React, { useState } from 'react';

const Sidebar = () => {
  const [productsExpanded, setProductsExpanded] = useState(false);

  const mainNav = [
    { label: 'Overview', icon: '/images/overview.svg' },
    { label: 'Products', icon: '/images/products.svg', expandable: true },
  ];

  const productSubNav = [
    'Reviews',
    'Disputes',
    'Top-ups',
    'Check deposits',
    'Payouts',
    'All transactions',
  ];

  const midNav = [
    { label: 'Balances', icon: '/images/balance.svg' },
    { label: 'Payments', icon: '/images/payments.svg' },
    { label: 'Connected accounts', icon: '/images/clipboard.svg' },
    { label: 'Products', icon: '/images/cube.svg' },
    { label: 'Readers', icon: '/images/readers.svg' },
    { label: 'Reports', icon: '/images/reports.svg' },
    { label: 'Issued cards', icon: '/images/issue-cards.svg' },
  ];

  const bottomNav = [
    { label: 'Developers', icon: '/images/developer.svg' },
    { label: 'View test data', icon: '/images/eye.svg' },
    { label: 'Settings', icon: '/images/settings.svg' },
  ];

  return (
    <aside className="w-64 bg-gray-50 h-screen border-r flex flex-col">
      <div className="py-5 px-3">
        <h1 className="text-xl font-bold mb-6 pl-2">FakeApp</h1>

        {/* Main Nav */}
        <nav className="flex flex-col gap-1 text-sm">
          {mainNav.map((item, index) => (
            <div
              key={index}
              onClick={() => item.expandable && setProductsExpanded(!productsExpanded)}
              className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer ${
                item.expandable && productsExpanded
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.icon && <img src={item.icon} alt={item.label} className="w-5 h-5" />}
              <span>{item.label}</span>
            </div>
          ))}

          {/* Sub Nav under Products */}
          {productsExpanded && (
            <div className="ml-6 flex flex-col gap-1 mt-1 text-gray-600">
              {productSubNav.map((label, idx) => (
                <div
                  key={idx}
                  className="px-3 py-2 rounded cursor-pointer hover:bg-gray-100"
                >
                  {label}
                </div>
              ))}
            </div>
          )}
        </nav>

        {/* Mid Nav */}
        <div className="mt-4 border-t pt-4 flex flex-col gap-1 text-sm">
          {midNav.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-2 rounded cursor-pointer text-gray-700 hover:bg-gray-100"
            >
              {item.icon && <img src={item.icon} alt={item.label} className="w-5 h-5" />}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav - Stuck to bottom with margin-top-auto */}
      <div className="mt-auto p-3 pt-6 border-t flex flex-col gap-1 text-sm">
        {bottomNav.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-3 py-2 rounded cursor-pointer text-gray-700 hover:bg-gray-100"
          >
            {item.icon && <img src={item.icon} alt={item.label} className="w-5 h-5" />}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
