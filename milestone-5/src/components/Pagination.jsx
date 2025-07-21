import ReactPaginate from "react-paginate";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-between items-center p-4 border-t bg-white">
      <ReactPaginate
        forcePage={currentPage - 1}
        pageCount={totalPages}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={(selected) => onPageChange(selected.selected + 1)}
        containerClassName="flex items-center gap-2"
        pageClassName=""
        pageLinkClassName="px-3 py-1 rounded hover:bg-gray-100"
        previousLinkClassName="flex items-center border px-3 py-1 rounded"
        nextLinkClassName="flex items-center border px-3 py-1 rounded"
        activeLinkClassName="bg-blue-100 text-blue-600"
        breakLinkClassName="px-2"
        disabledClassName="opacity-50 cursor-not-allowed"
        previousLabel={
          <span className="flex items-center">
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
                stroke-width="1.67"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span className="ml-1">Previous</span>
          </span>
        }
        nextLabel={
          <span className="flex items-center">
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
                stroke-width="1.67"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        }
      />
    </div>
  );
}
