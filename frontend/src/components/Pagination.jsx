const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  
    return (
      <nav aria-label="...">
        <ul className="pagination justify-content-center my-5">
          <li className={`page-item ${currentPage === 1 && "disabled"}`}>
            <span
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
            >
              Previous
            </span>
          </li>
          {pageNumbers.map((page) => (
            <li
              key={page}
              className={`page-item ${currentPage === page && "active"}`}
            >
              <span
                className="page-link"
                onClick={() => onPageChange(page)}
              >
                {page}
               
              </span>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages && "disabled"
            }`}
          >
            <span
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
            >
              Next
            </span>
          </li>
        </ul>
      </nav>
    );
  };
  
  export default Pagination;