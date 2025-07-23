export default function ProductItem({ product, isSelected, onSelect }) {
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
      <td className="p-2 truncate max-w-[200px]">{product.title}</td>
<td className="p-2 max-w-[200px] relative group">
  <div className="truncate">{product.description}</div>
  
  {/* Tooltip shown on hover */}
  <div className="absolute left-0 top-full mt-1 w-max max-w-sm bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
    {product.description}
  </div>
</td>
      <td className="p-2 text-center">${product.price}</td>
      <td className="p-2">
        <div className="flex gap-4 items-center justify-center">
          <button>
            <svg
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 5.00001H3.16667M3.16667 5.00001H16.5M3.16667 5.00001V16.6667C3.16667 17.1087 3.34226 17.5326 3.65482 17.8452C3.96738 18.1577 4.39131 18.3333 4.83333 18.3333H13.1667C13.6087 18.3333 14.0326 18.1577 14.3452 17.8452C14.6577 17.5326 14.8333 17.1087 14.8333 16.6667V5.00001H3.16667ZM5.66667 5.00001V3.33334C5.66667 2.89131 5.84226 2.46739 6.15482 2.15483C6.46738 1.84227 6.89131 1.66667 7.33333 1.66667H10.6667C11.1087 1.66667 11.5326 1.84227 11.8452 2.15483C12.1577 2.46739 12.3333 2.89131 12.3333 3.33334V5.00001M7.33333 9.16667V14.1667M10.6667 9.16667V14.1667"
                stroke="#667085"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.1666 2.5C14.3855 2.28113 14.6453 2.10752 14.9313 1.98906C15.2173 1.87061 15.5238 1.80965 15.8333 1.80965C16.1428 1.80965 16.4493 1.87061 16.7353 1.98906C17.0213 2.10752 17.2811 2.28113 17.5 2.5C17.7188 2.71887 17.8924 2.97871 18.0109 3.26468C18.1294 3.55064 18.1903 3.85714 18.1903 4.16667C18.1903 4.4762 18.1294 4.7827 18.0109 5.06866C17.8924 5.35463 17.7188 5.61447 17.5 5.83334L6.24996 17.0833L1.66663 18.3333L2.91663 13.75L14.1666 2.5Z"
                stroke="#667085"
                strokeWidth="1.66667"
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
