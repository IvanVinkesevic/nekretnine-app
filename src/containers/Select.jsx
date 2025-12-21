import React from "react";

function Select(props) {
  return (
    <div className="razmak">
      <div className="filter-row">
        <div>
          <label htmlFor="nekretnina-tip">Tip nekretnine: </label>
          <select
            id="lista-kategorija"
            onChange={props.onCategoryChange}
            value={props.selectedCategory || "0"} // Dodajte ako želite kontrolirani select
          >
            <option value="0">Svi tipovi</option>
            <option value="seoska-kuca">Seoska kuća</option>
            <option value="imanje">Imanje</option>
            <option value="zemljiste">Zemljište</option>
            <option value="suma">Šuma</option>
            <option value="vikendica">Vikendica</option>
          </select>
        </div>

        <div>
          <label htmlFor="lista-lokacija">Lokacija: </label>
          <select
            id="lista-lokacija"
            onChange={props.onLocationChange}
            value={props.selectedLocation || "0"}
          >
            <option value="0">Sve lokacije</option>
            <option value="Čazma">Čazma</option>
            <option value="Ivanska">Ivanska</option>
            <option value="Bjelovar">Bjelovar</option>
            <option value="Garešnica">Garešnica</option>
            <option value="Ivanic-grad">Ivanić grad</option>
            <option value="Popovača">Popovača</option>
            <option value="Križ">Križ</option>
            <option value="Narta">Narta</option>
            <option value="Berek">Berek</option>
          </select>
        </div>
      </div>

      <div className="filter-row">
        <div>
          <label>Cijena od (€):</label>
          <select
            onChange={props.onMinPriceChange}
            value={props.minPrice || "0"}
          >
            <option value="0">Bilo koja</option>
            <option value="10000">10.000 €</option>
            <option value="25000">25.000 €</option>
            <option value="50000">50.000 €</option>
            <option value="100000">100.000 €</option>
            <option value="200000">200.000 €</option>
          </select>
        </div>

        <div>
          <label>Cijena do (€):</label>
          <select
            onChange={props.onMaxPriceChange}
            value={props.maxPrice || "9999999"}
          >
            <option value="9999999">Bilo koja</option>
            <option value="50000">50.000 €</option>
            <option value="100000">100.000 €</option>
            <option value="200000">200.000 €</option>
            <option value="500000">500.000 €</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Select;
