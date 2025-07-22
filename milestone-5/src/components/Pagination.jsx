import ReactPaginate from "react-paginate";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center p-4 border-t bg-white">
      <ReactPaginate
        forcePage={currentPage - 1}
        pageCount={totalPages}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={(selected) => onPageChange(selected.selected + 1)}
        containerClassName="flex items-center gap-2"
        pageLinkClassName="px-3 py-1 rounded hover:bg-gray-100"
        previousLinkClassName="flex items-center border px-3 py-1 rounded"
        nextLinkClassName="flex items-center border px-3 py-1 rounded"
        activeLinkClassName="bg-blue-100 text-blue-600"
        breakLinkClassName="px-2"
        disabledClassName="opacity-50 cursor-not-allowed"
        previousLabel={
          <span className="flex items-center">
            <svg width="14" height="14" fill="none"><path d="M12.8333 7H1.16666M1.16666 7L7 12.8334M1.16666 7L7 1.16669" stroke="#344054" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="ml-1">Previous</span>
          </span>
        }
        nextLabel={
          <span className="flex items-center">
            <span className="mr-1">Next</span>
            <svg width="14" height="14" fill="none"><path d="M1.16663 7H12.8333M12.8333 7L7 1.16669M12.8333 7L7 12.8334" stroke="#344054" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
        }
      />
    </div>
  );
}
