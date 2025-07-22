export default function ProductItem({ product }) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-2">
        <input type="checkbox" />
      </td>
      <td className="p-2">
        <img src={product.images[0]} alt={product.title} className="w-12 h-12 object-cover" />
      </td>
      <td className="p-2">{product.title}</td>
      <td className="p-2">{product.description}</td>
      <td className="p-2">${product.price}</td>
      <td className="p-2 flex gap-2">
        <button>✏️</button>
        <button>🗑️</button>
      </td>
    </tr>
  );
}
