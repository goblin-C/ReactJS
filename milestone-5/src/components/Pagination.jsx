export default function Pagination({ offset, setOffset, limit }) {
  const handlePrev = () => setOffset(Math.max(offset - limit, 0));
  const handleNext = () => setOffset(offset + limit);

  return (
    <div className="flex justify-between items-center p-4 border-t bg-white">
      <button onClick={handlePrev} className="border px-3 py-1">Previous</button>
      <span>Page {offset / limit + 1}</span>
      <button onClick={handleNext} className="border px-3 py-1">Next</button>
    </div>
  );
}
