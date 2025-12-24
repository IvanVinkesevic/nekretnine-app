import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./PropertyDetails.css";

function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        const foundProperty = data.find((p) => p.id.toString() === id);
        if (foundProperty) {
          setProperty(foundProperty);
        } else {
          setError("Nekretnina nije pronađena");
        }
      })
      .catch((error) => setError(error.toString()))
      .finally(() => setLoading(false));
  }, [id]);

  // Helper funkcije
  const formatNumber = (num) => {
    return new Intl.NumberFormat("hr-HR").format(num);
  };

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

  if (loading)
    return <div className="details-loading">Učitavanje detalja...</div>;
  if (error) return <div className="details-error">Greška: {error}</div>;
  if (!property)
    return <div className="details-not-found">Nekretnina nije pronađena</div>;

  return (
    <div className="property-details-container">
      {/* Breadcrumb navigacija */}
      <div className="details-breadcrumb">
        <Link to="/">← Natrag na sve nekretnine</Link>
      </div>
      <div className="details-content">
        {/* Glavna slika */}
        <div className="details-image-section">
          <img
            src={property.slika || `/images/${property.id}.jpg`}
            alt={property.naziv}
            className="details-main-image"
            onError={(e) => {
              e.target.style.display = "none";
              // Kreiraj placeholder
              const placeholder = document.createElement("div");
              placeholder.className = "image-placeholder";
              placeholder.innerHTML = `
            <div>🏠</div>
            <span>${getTypeLabel(property.tip)}</span>
          `;
              e.target.parentNode.appendChild(placeholder);
            }}
          />
        </div>

        {/* Header */}
        <div className="details-header">
          <span className="details-type-badge">
            {getTypeLabel(property.tip)}
          </span>
          <h1 className="details-title">{property.naziv}</h1>
          <div className="details-location">
            <span>📍 {property.lokacija}</span>
          </div>
          <div className="details-price-section">
            <h2 className="details-price">{formatNumber(property.cijena)} €</h2>
            <p className="details-price-per-m2">
              ≈ {formatNumber(Math.round(property.cijena / property.zemljiste))}{" "}
              €/m²
            </p>
          </div>
        </div>

        {/* Opis */}
        <div className="details-description">
          <h3>Opis nekretnine</h3>
          <p>{property.opis}</p>
        </div>

        {/* Specifikacije */}
        <div className="details-specs">
          <h3>Specifikacije</h3>
          <div className="specs-grid">
            <div className="spec-item">
              <div className="spec-label">Površina zemljišta</div>
              <div className="spec-value">
                {formatNumber(property.zemljiste)} m²
              </div>
              <div className="spec-subtext">
                ({Math.round(property.zemljiste / 10000)} hektara)
              </div>
            </div>

            <div className="spec-item">
              <div className="spec-label">Tip nekretnine</div>
              <div className="spec-value">{getTypeLabel(property.tip)}</div>
            </div>

            <div className="spec-item">
              <div className="spec-label">Godina izgradnje</div>
              <div className="spec-value">
                {property.dodatno?.godinaIzgradnje || "Nepoznato"}
              </div>
            </div>

            <div className="spec-item">
              <div className="spec-label">Stanje</div>
              <div className="spec-value">
                {property.dodatno?.stanje || "Dobro"}
              </div>
            </div>
          </div>
        </div>

        {/* Kontakt informacije */}
        <div className="details-contact">
          <h3>Kontakt informacije</h3>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <span className="contact-label">Telefon:</span>
              <span className="contact-value">
                {property.kontakt?.telefon || "Nije dostupno"}
              </span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <span className="contact-label">Email:</span>
              <span className="contact-value">
                {property.kontakt?.email || "Nije dostupno"}
              </span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">👤</span>
              <span className="contact-label">Kontakt osoba:</span>
              <span className="contact-value">
                {property.kontakt?.ime || "Nije dostupno"}
              </span>
            </div>
          </div>

          <div className="contact-actions">
            <button className="contact-btn">📞 Pozovite sada</button>
            <button className="email-btn">✉️ Pošaljite upit</button>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="details-map">
          <h3>Lokacija</h3>
          <div className="map-placeholder">
            🗺️ Map integracija će biti dodana kasnije
            <p>Lokacija: {property.lokacija}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
