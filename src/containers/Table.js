function Table(props) {
  return (
    <div className="houses-table-container">
      {" "}
      <div className="table-container">
        <table className="houses-table">
          <thead>
            <tr>
              <th>Naziv nekretnine</th>
              <th>Lokacija</th>
              <th>Tip</th>
              <th>Zemljište (m²)</th>
              <th>Cijena (€)</th>
              <th>Detalji</th>
            </tr>
          </thead>
          <tbody>
            {props.podaci.map(
              ({ id, naziv, lokacija, tip, zemljiste, cijena, opis }) => (
                <tr key={id}>
                  <td>
                    <strong>{naziv}</strong>
                  </td>
                  <td>{lokacija}</td>
                  <td>{tip}</td>
                  <td>{zemljiste ? zemljiste.toLocaleString() : "-"}</td>
                  <td>
                    {cijena ? cijena.toLocaleString() + " €" : "Po dogovoru"}
                  </td>
                  <td>
                    {opis ? opis.substring(0, 50) + "..." : "Pogledaj detalje"}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      ;
    </div>
  );
}

export default Table;
