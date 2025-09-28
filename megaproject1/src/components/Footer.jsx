
// import "./Footer.css";

// function Footer() {
//     return (
//         <footer className="footer">
//             <div className="footer-container">

//                 <div className="footer-section">
//                     <h2>Laptop_देखो</h2>
//                     <p>
//                         Your one-stop shop for best laptops online. Stay connected with the latest technology.
//                     </p>
//                 </div>

//                 <div className="footer-section">
//                     <h3>Quick Links</h3>
//                     <ul>
//                         <li><a href="/">Home</a></li>
//                         <li><a href="/products">Products</a></li>
//                         <li><a href="/about">About</a></li>
//                         <li><a href="/contact">Contact</a></li>
//                     </ul>
//                 </div>

//                 <div className="footer-section">
//                     <h3>Follow Us</h3>
//                     <div className="social-icons">
//                         <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" /></a>
//                         <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Twitter" /></a>
//                         <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" /></a>
//                         <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" /></a>
//                     </div>
//                 </div>
//             </div>

       
//             <div className="footer-bottom">
//                 <p>© 2025 Laptop_DEKHO. All Rights Reserved.</p>
//             </div>
//         </footer>
//     );
// }

// export default Footer;

// import React from "react";
// import "./Footer.css";
// import cycle from '../assets/cycle-Footer-img-unscreen.gif'

// export default function Footer() {
//   return (
//     <footer className="footer">
//       <div className="footer-top">
//         {/* Left Section */}
//         <div className="footer-col">
//           <h3>Get in Touch</h3>
//           <p>Don’t miss any updates of our new templates and extensions.!</p>
//           <div className="subscribe">
//             <input type="email" placeholder="Email" />
//             <button>Subscribe</button>
//           </div>
//         </div>

//         {/* Middle Section */}
//         <div className="footer-col">
//           <h3>Download</h3>
//           <ul>
//             <li>Company</li>
//             <li>Android App</li>
//             <li>iOS App</li>
//             <li>Desktop</li>
//             <li>Projects</li>
//             <li>My tasks</li>
//           </ul>
//         </div>

//         {/* Right Section */}
//         <div className="footer-col">
//           <h3>Help</h3>
//           <ul>
//             <li>FAQ</li>
//             <li>Terms & Conditions</li>
//             <li>Reporting</li>
//             <li>Documentation</li>
//             <li>Support Policy</li>
//             <li>Privacy</li>
//           </ul>
//         </div>
//       </div>

//       {/* Bottom Animation */}
//       <div className="footer-animation">
//         <img src={cycle} alt="Cycle" className="cycle" />
//         <img src="/images/car.png" alt="Car" className="car" />
//       </div>

//       <div className="footer-bottom">
//         <p>© MYMOBILEshop Inc. 2019 All rights reserved.</p>
//       </div>
//     </footer>
//   );
// }

import React from "react";
import "./Footer.css";
import cycle from "../assets/cycle-Footer-img-unscreen.gif";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Left Section */}
        <div className="footer-col">
          <h3>Laptop_देखो</h3>
          <p>
            Your one-stop shop for best laptops online. Stay connected with the
            latest technology.
          </p>
          <div className="subscribe">
            <input type="email" placeholder="Email" />
            <button>Subscribe</button>
          </div>
        </div>

        {/* Middle Section - Quick Links */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Right Section - Social Media */}
        <div className="footer-col">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                alt="Facebook"
              />
            </a>
            <a href="#">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733558.png"
                alt="Twitter"
              />
            </a>
            <a href="#">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                alt="Instagram"
              />
            </a>
            <a href="#">
              <img
                src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                alt="LinkedIn"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Animation */}
      <div className="footer-animation">
        <img src={cycle} alt="Cycle" className="cycle" />
        <img src="/images/car.png" alt="Car" className="car" />
      </div>

      <div className="footer-bottom">
        <p>© 2025 Laptop_DEKHO. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
