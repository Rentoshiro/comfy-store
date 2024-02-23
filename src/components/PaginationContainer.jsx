import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

function PaginationContainer() {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;

  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1;
  });

  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  if (pageCount < 2) return null;
  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          onClick={() => {
            let prevPage = page - 1;
            if (prevPage === 0) {
              return;
            }
            handlePageChange(prevPage);
          }}
          className="btn btn-xs sm:btn-md join-vertical"
        >
          Prev
        </button>
        {pages.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`btn btn-xs sm:btn-md border-none join-item ${
                pageNumber === page ? "bg-slate-400 border-base-300" : ""
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > pageCount) {
              return;
            }
            handlePageChange(nextPage);
          }}
          className="btn btn-xs sm:btn-md join-vertical"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PaginationContainer;
