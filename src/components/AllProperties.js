import { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import Pagination from "./Pagination";

function AllProperties() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Paginacija state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // 2 reda po 3 kartice

  useEffect(() => {
    setLoading(true);
    fetch(process.env.PUBLIC_URL + "/data/houses-data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Učitano nekretnina:", data.length);
        setData(data);
        setFilteredData(data);
      })
      .catch((error) => setError(error.toString()))
      .finally(() => setLoading(false));
  }, []);

  // Izračunaj koje nekretnine prikazati
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scrollaj na vrh kad mijenjaš stranicu
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (error) return <div className="error">Greška: {error}</div>;
  if (loading) return <div className="loading">Učitavanje podataka...</div>;

  return (
    <div className="sadrzaj">
      <h1>Sve kuće i imanja</h1>
      <p className="filter-subtitle">
        Pronađeno {filteredData.length} nekretnina • Stranica {currentPage} od{" "}
        {totalPages}
      </p>

      {filteredData.length === 0 ? (
        <div className="no-results">
          <h3>Trenutno nema dostupnih nekretnina</h3>
          <p>Provjerite ponovo kasnije.</p>
        </div>
      ) : (
        <>
          <div className="properties-grid">
            {currentItems.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={filteredData.length}
            itemsPerPage={itemsPerPage}
          />
        </>
      )}
    </div>
  );
}

export default AllProperties;
