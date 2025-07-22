export default function ProductItem({ product, isSelected, onSelect }) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-2">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
        />
      </td>
      <td className="p-2 maz-w-xs">
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="w-12 h-12 object-cover"
        />
      </td>
      <td className="px-2 max-w-xs font-normal ">{product.title}</td>
      <td className="px-2 max-w-sm">{product.description}</td>
      <td className="px-2">${product.price}</td>
      <td className="px-2 max-w-xs flex gap-2">
        <button>
          <img src="/images/edit.svg" alt="Edit" />
        </button>
        <button>
          <img src="/images/trash.svg" alt="Delete" />
        </button>
      </td>
    </tr>
  );
}
