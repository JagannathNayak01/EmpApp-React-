import React from "react";

export default function Footer() {
  return (
    <>
      <footer>
        <div className="social-bar">
          <div className="brand">
            EMPLOYEE <span>LIST</span>
          </div>
          <div className="social-icons">
            <a href="#">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-whatsapp"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </div>
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Employees</a>
            </li>
            <li>
              <a href="#">Bookings</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Get Help</h3>
          <ul>
            <li>Faq</li>
            <li>Recomended Topics</li>
            <li>Help</li>
            <li>Payment Options</li>
            <li>Customer Care</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Contact Us</h3>
          <ul>
            <li>Team</li>
            <li>MCA</li>
            <li>Mob : +91 1234567890</li>
            <li>KIIT University</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Customer Feedback</h3>
          <form className="review-form">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea rows="4" placeholder="Your Review or Issue" required />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="row3">
          <div>
            Copyright © 2025 SAM Team No. - 1 All rights are reserved Privacy
            policy Terms & condition Jagannath Nayak, Samikshya Das, Suhana
            Parween
          </div>
        </div>
      </footer>
    </>
  );
}
