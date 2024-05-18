// import { useState, useEffect } from "react";
// import "./Navbar.css";

// const Navbar = () => {
//   const [isFixed, setIsFixed] = useState(false);

//   const [click, setClick] = useState(true);
//   const handleMenuClick = () => setClick(!click);
//   const closeMenu = () => setClick(true);
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 150) {
//         setIsFixed(true);
//       } else {
//         setIsFixed(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const scrollToSection = (sectionId) => {
//     const section = document.getElementById(sectionId);
//     section.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <div
//       className={isFixed ? "nav fixed" : "nav ok"}
//       style={{ padding: isFixed ? "10px 15%" : "60px 15%" }}
//     >
//       <div className="logo">
//         <img src="/bios-1@2x.png" alt="" srcset="" />
//       </div>
//       <div className="items">
//         <ul>
//           <li onClick={() => scrollToSection("home-section")}>Home</li>
//           <li onClick={() => scrollToSection("about-section")}>About</li>
//           <li onClick={() => scrollToSection("tokenomics-section")}>
//             Tokenomics
//           </li>
//           <li onClick={() => scrollToSection("roadmap-section")}>Roadmap</li>
//           <li onClick={() => scrollToSection("howtobuy-section")}>
//             How to Buy
//           </li>
//           <li onClick={() => scrollToSection("home-section")}>FAQ</li>
//           <li>
//             <label id="icon" onClick={handleMenuClick}>
//               <i className={click ? "fas fa-bars" : "fas fa-times"} />
//             </label>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
