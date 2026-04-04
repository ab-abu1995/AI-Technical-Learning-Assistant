import "../Css/Footer.css";
   // replace with your icon
function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* GET IN TOUCH */}
        <div className="footer-box">
          <h3>Get in Touch</h3>
          <p>Email: support@ai-learning.com</p>
          <p>Phone: +251 911 234 567</p>
          <p>Address: Bahir Dar, Ethiopia</p>
        </div>

        {/* FOLLOW US */}
<div className="footer-box">
  <h3>Follow Us</h3>
  <div className="social-icons">
    <a href="https://facebook.com/abiy0747" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-facebook-f"></i>
    </a>

    <a href="https://twitter.com/abiy0747" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-twitter"></i>
    </a>

    <a href="https://linkedin.com/in/abiy0747" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-linkedin-in"></i>
    </a>

    <a href="https://instagram.com/abiy0747" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-instagram"></i>
    </a>
  </div>
</div>

       {/* QUICK LINKS */}
<div className="footer-box">
  <h3>Quick Links</h3>
  <ul>
    <li><a href="#ocr">Offline Learning Power</a></li>
    <li><a href="#quiz">Teacher source uploader</a></li>
    <li><a href="#feedback">Personalized Assistance</a></li>
    <li><a href="#document">AI Practice Test</a></li>
  </ul>
</div>

       

        {/* WHO WE ARE */}
        <div className="footer-box">
          <h3>Who We Are</h3>
          <p>AI Technical Learning empowers students worldwide with smart, AI-driven offline and online learning solutions designed to enhance understanding, boost performance, and accelerate success.</p>
        </div>

    
      </div>

      <div className="footer-bottom">
        <p>© 2026 AI Technical Learning. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;