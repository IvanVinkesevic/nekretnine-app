function Contact() {
  return (
    <div className="sadrzaj CTA">
      <h1>Kontaktirajte nas!</h1>
      <h4>Neka vašu nekretninu nađu preko naše stranice</h4>
      <ul>
        <li>
          <strong className="udruga-ime">Autor:</strong>{" "}
          <span className="crveno">I</span>
          <span className="tamno-plavo">nicijativa za </span>
          <span className="crveno">r</span>
          <span className="tamno-plavo">evitalizaciju hrvatskog </span>
          <span className="crveno">s</span>
          <span className="tamno-plavo">ela</span>
        </li>
        <br />
        <li>
          <strong>Email:</strong>
          <a href="mailto:didivanovidvori@outlook.com?">
            didivanovidvori@outlook.com
          </a>
        </li>
        <br />
        <li>
          <strong>Napomena:</strong> Oglašavanje na našoj tražilici je besplatno
        </li>
        <br />
      </ul>
      <hr />
      <br />
      <p>Ako prodajete ili tražite nekretninu, kontaktirajte nas!</p>
    </div>
  );
}
export default Contact;
