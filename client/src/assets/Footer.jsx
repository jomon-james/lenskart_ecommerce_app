import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h3>LensKart Clone</h3>
          <p>Stylish eyewear for everyone.</p>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: support@lenskart.com</p>
          <p>Phone: +91 9876543210</p>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <p>Help Center</p>
          <p>FAQs</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 LensKart Clone. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;