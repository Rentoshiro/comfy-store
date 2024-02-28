import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

function ComplexPagination() {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;

  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = (pageNumber, activeClass) => {
    return (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`btn btn-xs sm:btn-md border-none join-item ${
          activeClass ? "bg-slate-400 border-base-300" : ""
        }`}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    //first button
    pageButtons.push(addPageButton(1, page === 1));

    //dots
    if (page > 2) {
      pageButtons.push(
        <button className="join-item btn btn-xs sm:btn-sm" key="dota-1">
          ...
        </button>
      );
    }

    //active
    if (page !== 1 && page !== pageCount) {
      pageButtons.push(addPageButton(page, true));
    }

    //dots
    if (page < pageCount - 1) {
      pageButtons.push(
        <button className="join-item btn btn-xs sm:btn-sm" key="dota-2">
          ...
        </button>
      );
    }

    // last button
    pageButtons.push(addPageButton(pageCount, page === pageCount));
    return pageButtons;
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
        {renderPageButtons()}
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

export default ComplexPagination;
