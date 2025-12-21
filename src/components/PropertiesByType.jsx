import { useEffect, useState } from "react";
import Select from "../containers/Select";
import PropertyCard from "../components/PropertyCard";
import Pagination from "./Pagination";

function PropertiesByType() {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState("0");
  const [selectedLocation, setSelectedLocation] = useState("0");
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("9999999");

  // Dodaj state za paginaciju:
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    setLoading(true);
    fetch("/data/houses-data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAllData(data);
        setFilteredData(data); // Prikaži sve na početku
      })
      .catch((error) => setError(error.toString()))
      .finally(() => setLoading(false));
  }, []);

  // Funkcija za primjenu svih filtera
  const applyFilters = (category, location, minPrice, maxPrice) => {
    console.log("=== APPLY FILTERS ===");
    console.log("Parametri:", { category, location, minPrice, maxPrice });
    let filtered = [...allData];
    console.log("Ukupno nekretnina:", allData.length);

    // Filter po tipu
    if (category && category !== "0") {
      console.log("Filtriram po tipu:", category);
      filtered = filtered.filter((nekretnina) => nekretnina.tip === category);
    }

    // Filter po lokaciji
    if (location && location !== "0") {
      console.log("Filtriram po lokaciji:", location);
      console.log("Sve lokacije u podacima:", [
        ...new Set(allData.map((n) => n.lokacija)),
      ]);

      filtered = filtered.filter(
        (nekretnina) => nekretnina.lokacija === location
      );
    }

    // Filter po minimalnoj cijeni
    if (minPrice && minPrice !== "0") {
      filtered = filtered.filter(
        (nekretnina) => nekretnina.cijena >= parseInt(minPrice)
      );
    }

    // Filter po maksimalnoj cijeni
    if (maxPrice && maxPrice !== "9999999") {
      filtered = filtered.filter(
        (nekretnina) => nekretnina.cijena <= parseInt(maxPrice)
      );
    }

    setFilteredData(filtered);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    applyFilters(category, selectedLocation, minPrice, maxPrice);
  };

  const handleLocationChange = (event) => {
    const location = event.target.value;
    setSelectedLocation(location);
    applyFilters(selectedCategory, location, minPrice, maxPrice);
  };

  const handleMinPriceChange = (event) => {
    const price = event.target.value;
    setMinPrice(price);
    applyFilters(selectedCategory, selectedLocation, price, maxPrice);
  };

  const handleMaxPriceChange = (event) => {
    const price = event.target.value;
    setMaxPrice(price);
    applyFilters(selectedCategory, selectedLocation, minPrice, price);
  };

  const resetFilters = () => {
    setSelectedCategory("0");
    setSelectedLocation("0");
    setMinPrice("0");
    setMaxPrice("9999999");
    setFilteredData(allData);
  };

  if (error) return <div className="error">Greška: {error}</div>;
  if (loading) return <div className="loading">Učitavanje podataka...</div>;

  return (
    <div className="sadrzaj">
      <h1>Pretraga kuća i imanja</h1>
      <p className="filter-subtitle">Filtrirajte po željenim kriterijima</p>

      <Select
        onCategoryChange={handleCategoryChange}
        onLocationChange={handleLocationChange}
        onMinPriceChange={handleMinPriceChange}
        onMaxPriceChange={handleMaxPriceChange}
        selectedCategory={selectedCategory}
        selectedLocation={selectedLocation}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />

      <button
        className="reset-filters-btn"
        onClick={resetFilters}
        style={{
          background: "#f8f9fa",
          border: "2px solid #dee2e6",
          color: "#495057",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "1rem",
          margin: "15px 0",
          transition: "all 0.3s ease",
        }}
      >
        Poništi sve filtere
      </button>

      {currentItems.map.length === 0 ? (
        <div className="no-results">
          <h3>Nema nekretnina za odabrane kriterije.</h3>
          <p>Pokušajte promijeniti filtere.</p>
        </div>
      ) : (
        <>
          <div className="properties-grid">
            {currentItems.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              totalItems={filteredData.length}
              itemsPerPage={itemsPerPage}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default PropertiesByType;
