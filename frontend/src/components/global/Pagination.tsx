import ReactPaginate from "react-paginate";

const Pagination = ({
    onClick,
    pageCount,
    lastPage,
    firstPage,
}: {
    onClick: any;
    pageCount: number;
    lastPage?: boolean;
    firstPage?: boolean;
}) => {
    return (
        <div>
            <ReactPaginate
                breakLabel="..."
                nextLabel="Next >"
                onPageChange={onClick}
                pageRangeDisplayed={4}
                marginPagesDisplayed={1}
                pageCount={pageCount}
                previousLabel="< Prev"
                activeClassName="bg-orange-500 text-white font-semibold shadow-md"
                pageLinkClassName="px-4 py-2 rounded-md hover:bg-orange-300 cursor-pointer transition"
                breakClassName="px-3 text-gray-400 select-none"
                breakLinkClassName="cursor-default"
                nextClassName={`px-4 py-2 rounded-md transition ${
                    lastPage
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-orange-600 hover:bg-orange-300 cursor-pointer"
                }`}
                nextLinkClassName="block"
                previousClassName={`px-4 py-2 rounded-md transition ${
                    firstPage
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-orange-600 hover:bg-orange-300 cursor-pointer"
                }`}
                previousLinkClassName="block"
                containerClassName="flex items-center justify-center gap-2 mt-8 px-3 py-2 border border-gray-200 rounded-md shadow-sm text-gray-600 select-none"
                pageClassName="border border-transparent"
                disabledClassName="opacity-50"
            />
        </div>
    );
};

export default Pagination;
