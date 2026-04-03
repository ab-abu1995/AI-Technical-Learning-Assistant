
import "../Css/Footer.css";
import playstore from "../assets/Playstore.webp"; // replace with your icon
import appstore from "../assets/Appstore.webp";   // replace with your icon

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
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>

        {/* FEATURED ARTICLES */}
        <div className="footer-box">
          <h3>Featured Articles</h3>
          <ul>
            <li><a href="#">AI in Education</a></li>
            <li><a href="#">Offline Learning Tools</a></li>
            <li><a href="#">Study Tips with AI</a></li>
            <li><a href="#">Quizzes & Practice</a></li>
          </ul>
        </div>

        {/* TOOLS */}
        <div className="footer-box">
          <h3>Tools</h3>
          <ul>
            <li><a href="#">OCR Homework Solver</a></li>
            <li><a href="#">AI Quiz Generator</a></li>
            <li><a href="#">Topic Tracker</a></li>
            <li><a href="#">Revision Planner</a></li>
          </ul>
        </div>

        {/* WHO WE ARE */}
        <div className="footer-box">
          <h3>Who We Are</h3>
          <p>AI Technical Learning is dedicated to providing smart offline & online learning solutions for students worldwide.</p>
        </div>

        {/* DOWNLOAD APP */}
        <div className="footer-box">
          <h3>Download App</h3>
          <div className="download-buttons">
            <a href="#"><img src={playstore} alt="Playstore" /></a>
            <a href="#"><img src={appstore} alt="Appstore" /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 AI Technical Learning. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;