function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}) {
  // Generiraj brojeve stranica za prikaz
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      // Ako ima malo stranica, prikaži sve
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    // Podesi startPage ako smo blizu kraja
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  // Izračunaj koji se items prikazuju
  const startItem = Math.min((currentPage - 1) * itemsPerPage + 1, totalItems);
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        Prikazujem {startItem}-{endItem} od {totalItems} nekretnina
      </div>

      <div className="pagination">
        {/* Prva stranica */}
        <button
          className="pagination-btn first"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          aria-label="Prva stranica"
        >
          ⏮️
        </button>

        {/* Prethodna stranica */}
        <button
          className="pagination-btn prev"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Prethodna stranica"
        >
          ◀️
        </button>

        {/* Brojevi stranica */}
        {getPageNumbers().map((page) => (
          <button
            key={page}
            className={`pagination-btn ${currentPage === page ? "active" : ""}`}
            onClick={() => onPageChange(page)}
            aria-label={`Stranica ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        ))}

        {/* Sljedeća stranica */}
        <button
          className="pagination-btn next"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Sljedeća stranica"
        >
          ▶️
        </button>

        {/* Zadnja stranica */}
        <button
          className="pagination-btn last"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Zadnja stranica"
        >
          ⏭️
        </button>
      </div>
    </div>
  );
}

export default Pagination;
