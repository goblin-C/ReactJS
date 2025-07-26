import { useState } from "react";

const topItems = [
  { item: "Overview", icon: true },
  { item: "Products", icon: true },
];

const childItems = [
  { item: "Reviews", icon: true },
  { item: "Disputes", icon: true },
  { item: "Top-ups", icon: true },
  { item: "Check deposits", icon: true },
  { item: "Payouts", icon: true },
  { item: "All transactions", icon: true },
];

const middleItems = [
  { item: "Balances", icon: true },
  { item: "Payments", icon: true },
  { item: "Connected accounts", icon: true },
  { item: "Items", icon: true },
  { item: "Readers", icon: true },
  { item: "Reports", icon: true },
  { item: "Issued cards", icon: true },
];

const bottomItems = [
  { item: "Developers", icon: true },
  { item: "View test data", icon: true },
  { item: "Settings", icon: true },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    if (item === "Products") {
      setExpanded(!expanded);
    } else {
      setExpanded(false);
    }
  };

  const renderMenuItems = (items, indent = false) =>
    items.map((record, index) => {
      const isSelected = record.item === selectedItem;
      return (
        <li key={index}>
          <button
            onClick={() => handleItemClick(record.item)}
            className={`flex items-center gap-2 py-1 w-[208px] rounded-[6px] transition-colors duration-200 ${
              isSelected ? "bg-[#D7EDFF]" : "hover:bg-[#D7EDFF]"
            }`}
          >
            {record.icon && (
              <div className={`pl-2 ${indent ? "ml-4" : ""}`}>
                <img
                  src={
                    "images/" +
                    record.item.toLowerCase().replace(/\s/g, "_") +
                    ".svg"
                  }
                  alt=""
                />
              </div>
            )}
            <span
              className={`text-sidebarItem font-bold ${
                isSelected
                  ? "text-[#4094F7]"
                  : "text-sidebar-text-color"
              } transition-colors duration-200`}
            >
              {record.item}
            </span>
          </button>
        </li>
      );
    });

  return (
    <div className="h-full flex flex-col bg-[#F6F8F9] pr-4 font-sans">
      <div className="pl-[40px] pt-[26px]">
        <h1 className="text-sidebarHeading font-semibold">FakeApp</h1>
      </div>

      <nav className="flex flex-col flex-1">
        {/* topItems */}
        <ol className="pl-4 pt-2">
          {topItems.map((record, index) => {
            const isSelected = record.item === selectedItem;
            return (
              <div key={index}>
                <li>
                  <button
                    onClick={() => handleItemClick(record.item)}
                    className={`flex items-center gap-2 py-1 w-[208px] rounded-[6px] transition-colors duration-200 ${
                      isSelected ? "bg-[#D7EDFF]" : "hover:bg-[#D7EDFF]"
                    }`}
                  >
                    {record.icon && (
                      <div className="pl-2">
                        <img
                          src={
                            "images/" +
                            record.item.toLowerCase().replace(/\s/g, "_") +
                            ".svg"
                          }
                          alt=""
                        />
                      </div>
                    )}
                    <span
                      className={`text-sidebarItem font-bold ${
                        isSelected
                          ? "text-[#4094F7]"
                          : "text-sidebar-text-color"
                      } transition-colors duration-200`}
                    >
                      {record.item}
                    </span>
                  </button>
                </li>
                {record.item === "Products" && expanded && (
                  <ol className="pl-2">{renderMenuItems(childItems, true)}</ol>
                )}
              </div>
            );
          })}
        </ol>

        {/* middleItems */}
        <ol className="pl-4">{renderMenuItems(middleItems)}</ol>

        {/* bottomItems */}
        <ol className="pl-4 pb-4 mt-auto">{renderMenuItems(bottomItems)}</ol>
      </nav>
    </div>
  );
}
