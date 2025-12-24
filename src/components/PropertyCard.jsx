import { Link } from "react-router-dom";

function PropertyCard({ property }) {
  // Mapiranje vrijednosti za prikaz
  const getTypeLabel = (type) => {
    const typeMap = {
      "seoska-kuca": "Seoska kuća",
      imanje: "Poljoprivredno imanje",
      zemljiste: "Zemljište",
      suma: "Šumska površina",
      vikendica: "Vikendica",
    };
    return typeMap[type] || type;
  };

  // Formatiranje brojeva
  const formatNumber = (num) => {
    return new Intl.NumberFormat("hr-HR").format(num);
  };

  // Helper funkcija za boje placeholder slika
  const getPlaceholderColor = (type) => {
    const colors = {
      "seoska-kuca": "#4caf50",
      imanje: "#2196f3",
      zemljiste: "#ff9800",
      suma: "#795548",
      vikendica: "#9c27b0",
    };
    return colors[type] || "#607d8b";
  };

  // Određuje koji source koristiti za sliku
  const getImageSource = () => {
    // Prvo probaj ImgBB link (ako postoji i nije prazan)
    if (property.slika && property.slika.trim() !== "") {
      return property.slika;
    }
    // Ako nema ImgBB linka, probaj lokalnu sliku
    return `/images/${property.id}.jpg`;
  };

  return (
    <div
      className="property-card"
      style={{
        border: "2px solid #2e7d32",
        borderRadius: "12px",
        overflow: "hidden",
        background: "white",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      {/* Slika s overlayem */}
      <div className="property-image" style={{ position: "relative" }}>
        <img
          src={getImageSource()}
          alt={property.naziv}
          style={{
            width: "100%",
            height: "220px",
            objectFit: "cover",
            display: "block",
          }}
          onError={(e) => {
            e.target.onerror = null;
            // Ako slika ne postoji, prikaži placeholder
            e.target.style.display = "none";

            // Kreiraj placeholder div
            const placeholder = document.createElement("div");
            placeholder.style.width = "100%";
            placeholder.style.height = "220px";
            placeholder.style.backgroundColor = getPlaceholderColor(
              property.tip
            );
            placeholder.style.display = "flex";
            placeholder.style.alignItems = "center";
            placeholder.style.justifyContent = "center";
            placeholder.style.color = "white";
            placeholder.style.fontSize = "1.2rem";
            placeholder.style.fontWeight = "bold";
            placeholder.textContent = getTypeLabel(property.tip);

            e.target.parentNode.appendChild(placeholder);
          }}
        />

        {/* Overlay s tipom */}
        <span
          className="property-type"
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            background: "rgba(46, 125, 50, 0.95)",
            color: "white",
            padding: "6px 15px",
            borderRadius: "20px",
            fontSize: "0.85rem",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {getTypeLabel(property.tip)}
        </span>
      </div>

      {/* Informativni dio */}
      <div className="property-info" style={{ padding: "20px" }}>
        <h3
          className="property-title"
          style={{
            margin: "0 0 12px 0",
            color: "#2c3e50",
            fontSize: "1.4rem",
            lineHeight: "1.3",
          }}
        >
          {property.naziv}
        </h3>

        <div
          className="property-location"
          style={{
            color: "#7f8c8d",
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "0.95rem",
          }}
        >
          <span style={{ fontWeight: "bold" }}>📍 {property.lokacija}</span>
        </div>

        <div
          className="property-description"
          style={{
            color: "#5a6268",
            fontSize: "0.95rem",
            lineHeight: "1.6",
            marginBottom: "15px",
            minHeight: "45px",
          }}
        >
          <p>{property.opis}</p>
        </div>

        {/* Detalji */}
        <div
          className="property-details"
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "15px 0",
            padding: "15px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            border: "1px solid #dee2e6",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "0.9rem", color: "#6c757d" }}>Površina</div>
            <div
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "#2e7d32",
              }}
            >
              {formatNumber(property.zemljiste)} m²
            </div>
            <div style={{ fontSize: "0.8rem", color: "#7f8c8d" }}>
              ({Math.round(property.zemljiste / 10000)} ha)
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "0.9rem", color: "#6c757d" }}>Cijena</div>
            <div
              style={{
                fontSize: "1.4rem",
                fontWeight: "bold",
                color: "#b45309",
                marginTop: "5px",
              }}
            >
              {formatNumber(property.cijena)} €
            </div>
          </div>
        </div>

        {/* Info o slici (debug) */}
        {property.slika && (
          <div
            style={{
              fontSize: "0.8rem",
              color: "#6c757d",
              padding: "5px",
              background: "#f0f0f0",
              borderRadius: "4px",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            📷 Slika preko ImgBB
          </div>
        )}

        {/* Akcijski gumbi */}
        <div className="property-actions">
          <Link to={`/nekretnina/${property.id}`} className="view-details-btn">
            <span>🔍</span>
            <span>Detalji</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
