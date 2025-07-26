import ReactPaginate from "react-paginate";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePageChange = (selected) => {
    onPageChange(selected.selected + 1);
  };

  return (
    <div className="flex flex-col gap-2 p-4 border-t bg-white">
      {/* Previous and Next controls in a separate div */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => onPageChange(Math.max(currentPage, 1))}
          disabled={currentPage === 1}
          className="flex items-center border px-3 py-1 rounded text-sm text-gray-700 disabled:opacity-50"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.8333 7.00002H1.16666M1.16666 7.00002L6.99999 12.8334M1.16666 7.00002L6.99999 1.16669"
              stroke="#344054"
              strokeWidth="1.67"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="ml-1">Previous</span>
        </button>
      {/* Page numbers centered */}
      <div className="flex justify-center items-center">
        <ReactPaginate
          forcePage={currentPage - 1}
          pageCount={totalPages}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName="flex items-center gap-2"
          pageLinkClassName="px-3 py-1 rounded hover:bg-gray-100"
          activeLinkClassName="bg-blue-100 text-blue-600"
          breakLinkClassName="px-2"
          disabledClassName="opacity-50 cursor-not-allowed"
          previousLabel={null}
          nextLabel={null}
        />
      </div>
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="flex items-center border px-3 py-1 rounded text-sm text-gray-700 disabled:opacity-50"
        >
          <span className="mr-1">Next</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.16663 7.00002H12.8333M12.8333 7.00002L6.99996 1.16669M12.8333 7.00002L6.99996 12.8334"
              stroke="#344054"
              strokeWidth="1.67"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
