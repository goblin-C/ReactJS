export default function ProductItem({ product, isSelected, onSelect, onDelete }) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-2">
        <input type="checkbox" checked={isSelected} onChange={onSelect} />
      </td>
      <td className="p-2">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-12 h-12 object-cover"
        />
      </td>
      <td className="p-2 max-w-[200px] text-[#252C32] font-inter font-normal text-sm">
        {product.title}
      </td>
      <td className="p-2 max-w-[200px] relative group text-[#252C32] font-inter font-normal text-sm">
        <div className="truncate">{product.description}</div>
        <div className="absolute left-0 top-full mt-1 w-max max-w-sm bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
          {product.description}
        </div>
      </td>
      <td className="p-2 text-center text-[#252C32] font-inter font-normal text-sm">
        ${product.price}
      </td>
      <td className="p-2">
        <div className="flex gap-4 items-center justify-center">
          <button onClick={() => onDelete(product)}>
            {/* Trash icon */}
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 5H3.167H16.5M3.167 5V16.667C3.167 17.109 3.342 17.533 3.655 17.845C3.967 18.158 4.391 18.333 4.833 18.333H13.167C13.609 18.333 14.033 18.158 14.345 17.845C14.658 17.533 14.833 17.109 14.833 16.667V5M5.667 5V3.333C5.667 2.891 5.842 2.467 6.155 2.155C6.467 1.842 6.891 1.667 7.333 1.667H10.667C11.109 1.667 11.533 1.842 11.845 2.155C12.158 2.467 12.333 2.891 12.333 3.333V5M7.333 9.167V14.167M10.667 9.167V14.167"
                stroke="#667085"
                strokeWidth="1.667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button>
            {/* Edit icon */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.167 2.5C14.386 2.281 14.645 2.108 14.931 1.989C15.217 1.871 15.524 1.81 15.833 1.81C16.143 1.81 16.449 1.871 16.735 1.989C17.021 2.108 17.281 2.281 17.5 2.5C17.719 2.719 17.892 2.979 18.011 3.265C18.129 3.551 18.19 3.857 18.19 4.167C18.19 4.476 18.129 4.783 18.011 5.069C17.892 5.355 17.719 5.615 17.5 5.833L6.25 17.083L1.667 18.333L2.917 13.75L14.167 2.5Z"
                stroke="#667085"
                strokeWidth="1.667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}
