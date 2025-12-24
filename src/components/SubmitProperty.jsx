// components/SubmitProperty.jsx
import { useState, useRef } from "react";

function SubmitProperty() {
  const [formData, setFormData] = useState({
    propertyType: "seoska-kuca",
    location: "",
    size: "",
    price: "",
    description: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    images: "",
    additionalInfo: "",
    terms: false,
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const fileInputRef = useRef(null);

  // API ključevi
  const IMGBB_API_KEY = "3814110caf5c0aef9d0d59b2366820a1";
  const FORMSPREE_URL = "https://formspree.io/f/xdandkpj";

  // Odabir slika
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  // Upload na imgBB
  const uploadToImgBB = async () => {
    if (selectedFiles.length === 0) return [];

    setIsUploading(true);
    const urls = [];

    for (const file of selectedFiles) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("key", IMGBB_API_KEY);

      try {
        const response = await fetch("https://api.imgbb.com/1/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (data.success) {
          urls.push(data.data.url);
        }
      } catch (error) {
        console.error("Greška pri uploadu:", error);
      }
    }

    setIsUploading(false);
    setUploadedUrls(urls);

    // Spremi URL-ove u formu
    setFormData((prev) => ({
      ...prev,
      images: urls.join("\n"),
    }));

    return urls;
  };

  // Pošalji formu
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prvo uploadaj slike ako postoje
    if (selectedFiles.length > 0 && uploadedUrls.length === 0) {
      await uploadToImgBB();
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          _subject: `Nova nekretnina za objavu: ${formData.propertyType} u ${formData.location}`,
          _replyto: formData.contactEmail,
          uploadedImages: uploadedUrls,
        }),
      });

      if (response.ok) {
        setSubmitMessage(
          "✅ Hvala vam! Podaci o nekretnini su poslani. Kontaktirat ćemo vas u najkraćem roku."
        );
        // Reset form
        setFormData({
          propertyType: "seoska-kuca",
          location: "",
          size: "",
          price: "",
          description: "",
          contactName: "",
          contactEmail: "",
          contactPhone: "",
          images: "",
          additionalInfo: "",
          terms: false,
        });
        setSelectedFiles([]);
        setUploadedUrls([]);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setSubmitMessage("❌ Došlo je do greške. Pokušajte ponovno.");
      }
    } catch (error) {
      setSubmitMessage("❌ Došlo je do greške. Pokušajte ponovno.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="submit-property-container">
      {/* HEADER - NE MIJENJAJ */}
      <div className="submit-header">
        <h1>Oglasite svoju nekretninu</h1>
        <p className="subtitle">
          <strong>
            Prodajete nekretninu na selu? Besplatno je oglasite na našoj
            platformi i doprinesite razvoju ruralnih zajednica.
          </strong>
        </p>
      </div>

      {/* INFO BOXES - NE MIJENJAJ */}
      <div className="submit-info">
        <div className="info-box">
          <h3>📋 Što nudimo?</h3>
          <ul>
            <li>
              <strong>Besplatno objavljivanje</strong> - bez naknada i provizija
            </li>
            <li>
              <strong>Ciljana publika</strong> - mlade obitelji koje traže život
              na selu
            </li>
            <li>
              <strong>Edukativni pristup</strong> - pomažemo kupcima da razumiju
              potencijal nekretnine
            </li>
            <li>
              <strong>Podrška zajednici</strong> - vaša prodaja doprinosi
              razvoju sela
            </li>
          </ul>
        </div>

        <div className="info-box">
          <h3>⚠️ Važne napomene</h3>
          <ul>
            <li>
              Objavljujemo samo <strong>iskrene i realne oglase</strong>
            </li>
            <li>
              Posebno su dobrodošle <strong>stare kuće za obnovu</strong>
            </li>
            <li>
              Preferiramo <strong>pristupačne cijene</strong> za mlade
            </li>
            <li>
              Mi ne sudjelujemo ni na koji način <strong>u kupoprodaji</strong>.
              Samo želimo pomoći mladima u izboru.
            </li>
            <li>
              Svi podaci se <strong>provjeravaju</strong> prije objave
            </li>
          </ul>
        </div>
      </div>

      {/* FORMA - OVDJE JE GLANVI DIO */}
      <form onSubmit={handleSubmit} className="property-form">
        {/* OSNOVNI PODACI - ISTO KAO PRIJE */}
        <div className="form-section">
          <h3>📝 Osnovni podaci o nekretnini</h3>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="propertyType">Tip nekretnine *</label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                required
              >
                <option value="seoska-kuca">Seoska kuća</option>
                <option value="imanje">Poljoprivredno imanje</option>
                <option value="zemljiste">Zemljište</option>
                <option value="vikendica">Vikendica</option>
                <option value="suma">Šumska površina</option>
                <option value="ostalo">Ostalo</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="location">Lokacija (mjesto, općina) *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="npr. Samarica, Ivanska"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="size">Površina *</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  required
                  placeholder="npr. 20000"
                />
                <span className="unit">m²</span>
              </div>
              <small className="hint">(1 ha = 10.000 m²)</small>
            </div>

            <div className="form-group">
              <label htmlFor="price">Cijena (EUR) *</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  placeholder="npr. 45000"
                />
                <span className="unit">€</span>
              </div>
              <small className="hint">
                (ili "na dogovor" ako niste sigurni)
              </small>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Opis nekretnine *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Opišite nekretninu detaljno: stanje, godina izgradnje, infrastruktura (struja, voda, asfalt), okolinu, prednosti..."
            />
          </div>

          {/* NOVO: UPLOAD SLIKA - OVO JE DODANO */}
          <div className="form-group">
            <label htmlFor="images">Fotografije nekretnine</label>

            <div style={{ marginBottom: "15px" }}>
              <input
                type="file"
                id="fileInput"
                ref={fileInputRef}
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                style={{
                  display: "block",
                  marginBottom: "10px",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  width: "100%",
                }}
              />

              {selectedFiles.length > 0 && (
                <div style={{ margin: "15px 0" }}>
                  <p>
                    <strong>Odabrane slike ({selectedFiles.length}):</strong>
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                      marginTop: "10px",
                    }}
                  >
                    {selectedFiles.map((file, index) => (
                      <div
                        key={index}
                        style={{ position: "relative", width: "100px" }}
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index}`}
                          style={{
                            width: "100%",
                            height: "80px",
                            objectFit: "cover",
                            borderRadius: "5px",
                            border: "1px solid #ddd",
                          }}
                        />
                        <small
                          style={{
                            fontSize: "10px",
                            display: "block",
                            textAlign: "center",
                            marginTop: "5px",
                            wordBreak: "break-all",
                          }}
                        >
                          {file.name.length > 15
                            ? file.name.substring(0, 12) + "..."
                            : file.name}
                        </small>
                      </div>
                    ))}
                  </div>

                  {selectedFiles.length > 0 && uploadedUrls.length === 0 && (
                    <button
                      type="button"
                      onClick={uploadToImgBB}
                      disabled={isUploading}
                      style={{
                        backgroundColor: isUploading ? "#ccc" : "#4CAF50",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        cursor: isUploading ? "not-allowed" : "pointer",
                        marginTop: "15px",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {isUploading
                        ? "📤 Uploadam slike..."
                        : `📤 Uploadaj ${selectedFiles.length} slika`}
                    </button>
                  )}
                </div>
              )}

              {uploadedUrls.length > 0 && (
                <div
                  style={{
                    backgroundColor: "#d4edda",
                    color: "#155724",
                    padding: "12px",
                    borderRadius: "5px",
                    marginTop: "15px",
                    border: "1px solid #c3e6cb",
                  }}
                >
                  ✅ {uploadedUrls.length} slika uspješno uploadano!
                </div>
              )}
            </div>

            <textarea
              id="images"
              name="images"
              value={formData.images}
              onChange={handleChange}
              rows="3"
              placeholder="URL linkovi će se automatski popuniti nakon uploada..."
              readOnly={uploadedUrls.length > 0}
              style={{
                backgroundColor: uploadedUrls.length > 0 ? "#f8f9fa" : "white",
                cursor: uploadedUrls.length > 0 ? "not-allowed" : "text",
              }}
            />
            <small className="hint">
              {uploadedUrls.length > 0
                ? "Slike su spremljene na sigurni server. Ovo polje je automatski popunjeno."
                : "Preporučeno: 3-10 slika (JPG, PNG, max 5MB po slici)"}
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="additionalInfo">
              Dodatne informacije (opcionalno)
            </label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              rows="3"
              placeholder="Dostupnost za gledanje, dodatne zgrade (šupe, štale), voćnjaci, izvori vode, povijest nekretnine..."
            />
          </div>
        </div>

        {/* KONTAKT PODACI - NE MIJENJAJ */}
        <div className="form-section">
          <h3>📞 Vaši kontakt podaci</h3>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="contactName">Ime i prezime *</label>
              <input
                type="text"
                id="contactName"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                required
                placeholder="Vaše ime i prezime"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactEmail">Email adresa *</label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                required
                placeholder="primjer@email.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="contactPhone">Telefon (opcionalno)</label>
            <input
              type="tel"
              id="contactPhone"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              placeholder="+385 99 123 4567"
            />
            <small className="hint">
              Koristit ćemo ga samo za dogovor gledanja
            </small>
          </div>
        </div>

        {/* CHECKBOXOVI - NE MIJENJAJ */}
        <div className="form-section">
          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              required
            />
            <label htmlFor="terms">
              * Slažem se da se moji podaci koriste isključivo za kontakt i
              objavu nekretnine. Slažem se s{" "}
              <a
                href="/pravlinik.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                pravilima objave
              </a>
              .
            </label>
          </div>

          <div className="form-group checkbox">
            <input type="checkbox" id="newsletter" name="newsletter" />
            <label htmlFor="newsletter">
              Želim primati informacije o aktivnostima udruge (nije obavezno)
            </label>
          </div>
        </div>

        {/* PORUKA NAKON SUBMIT - NE MIJENJAJ */}
        {submitMessage && (
          <div
            className={`submit-message ${
              submitMessage.includes("✅") ? "success" : "error"
            }`}
          >
            {submitMessage}
          </div>
        )}

        {/* SUBMIT BUTTON - MALO PROMIJENJEN */}
        <button
          type="submit"
          className="submit-btn"
          disabled={isSubmitting || !formData.terms || isUploading}
          style={{
            opacity: isSubmitting || !formData.terms || isUploading ? 0.6 : 1,
            cursor:
              isSubmitting || !formData.terms || isUploading
                ? "not-allowed"
                : "pointer",
          }}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Šaljem podatke...
            </>
          ) : isUploading ? (
            "Uploadam slike..."
          ) : (
            "Pošalji podatke o nekretnini"
          )}
        </button>

        {/* FOOTNOTES - NE MIJENJAJ */}
        <div className="form-note">
          <p>
            <strong>Što se događa nakon slanja?</strong>
            <br />
            1. Provjerit ćemo podatke i kontaktirati vas unutar 48 sati
            <br />
            2. Dogovorit ćemo detalje i eventualno gledanje nekretnine
            <br />
            3. Objaviti ćemo nekretninu na stranici s vašim kontaktom
            <br />
            4. Pratit ćemo interes i pružiti podršku u komunikaciji s kupcima
          </p>
        </div>
      </form>
    </div>
  );
}

export default SubmitProperty;
