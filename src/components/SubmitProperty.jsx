// components/SubmitProperty.jsx
import { useState } from "react";

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // Tvoj Formspree endpoint za nekretnine
  const FORMSPREE_URL = "https://formspree.io/f/xdandkpj";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          _subject: `Nova nekretnina za objavu: ${formData.propertyType} u ${formData.location}`,
          _replyto: formData.contactEmail,
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
      } else {
        setSubmitMessage("❌ Došlo je do greške. Pokušajte ponovno.");
      }
    } catch (error) {
      setSubmitMessage("❌ Došlo je do greške. Pokušajte ponovno.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="submit-property-container">
      <div className="submit-header">
        <h1>Objavite svoju nekretninu</h1>
        <p className="subtitle">
          Prodajete ili iznajmljujete nekretninu na selu? Besplatno je objavite
          na našoj platformi i doprinesite razvoju ruralnih zajednica.
        </p>
      </div>

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
              Svi podaci se <strong>provjeravaju</strong> prije objave
            </li>
          </ul>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="property-form">
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

          <div className="form-group">
            <label htmlFor="images">Linkovi na slike (opcionalno)</label>
            <textarea
              id="images"
              name="images"
              value={formData.images}
              onChange={handleChange}
              rows="3"
              placeholder="URL linkovi na fotografije (Google Drive, Dropbox, OneDrive...) ili nam možete poslati slike emailom"
            />
            <small className="hint">Minimalno 2-3 slike preporučeno</small>
          </div>

          <div className="form-group">
            <label htmlFor="additionalInfo">
              Dodatne informacje (opcionalno)
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

        {submitMessage && (
          <div
            className={`submit-message ${
              submitMessage.includes("✅") ? "success" : "error"
            }`}
          >
            {submitMessage}
          </div>
        )}

        <button
          type="submit"
          className="submit-btn"
          disabled={isSubmitting || !formData.terms}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Šaljem podatke...
            </>
          ) : (
            "Pošalji podatke o nekretnini"
          )}
        </button>

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
