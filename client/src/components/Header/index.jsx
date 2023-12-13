import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0">Quizzardly</h1>
          </Link>
          <p className="m-0"></p>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {/* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username  */}
                {Auth.getProfile().authenticatedPerson.username}'s profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;


// Breakline here comment out the bottom section if anything broke from it



// import { Link } from 'react-router-dom';
// // import {Link} from 'react-scroll'
// import React, { useEffect, useState } from 'react';
// import Quizardly from '../../assets/quizardly.png'
// import Auth from '../../utils/auth';
// import './NavBar.css'


// const Header = () => {  
//   const logout = (event) => {
//     event.preventDefault();
//     Auth.logout();
//   };
// const [navbarStyle, setNavbarStyle] = useState({});
// const [open, setOpen] = useState(false);
// const [scroll, setScroll] = useState(false);

// const toggleMenu = () => {
//   setOpen(!open);
// };

// useEffect(() => {
//   const handleScroll = () => {
//     const scrollTop = window.scrollY || document.documentElement.scrollTop;
//     const scrollHeight = 
//     document.documentElement.scrollHeight -
//      document.documentElement.clientHeight;
//     const scrollPercentage = (scrollTop / scrollHeight) * 100;


//           if (scrollPercentage >= 2) {
//         setScroll(true);

//         setNavbarStyle({
        
//           backgroundColor: 'rgba(0, 0, 0, 0.2)',
//         });

//       } else {
//         setNavbarStyle({});
//         setScroll(false);
//       }
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
    
//   }, []);

//   return (
//     <>
//     <nav style={navbarStyle} className={`navbar ${open ? "nav-open" : ''} ${scroll ? "scrolled" : ''}`}>
//       <div className="tophead">
//         <h1>
//         <img src={Quizardly} className="quizardly"/><Link className='name-logo' spy={true} smooth={true} offset={50} duration={500} to="home">
//         uizardly</Link> <span className='blink'></span>
//         </h1>
//         <div className={`menu-btn ${open ? "opened-btn" : ''}`} onClick={toggleMenu}>

//         </div>
//       </div>
//       <ul className={`menu ${open ? "open" : ''}`}>

//       <li>
//           <Link spy={true} smooth={true} offset={50} duration={500} onClick={toggleMenu} to="home">
//           <button className="navbutton">  Create Quiz </button>
//           </Link>
//         </li>
//         <li>
//           <Link spy={true} smooth={true} offset={50} duration={500} onClick={toggleMenu} to="about">
//            <button className="navbutton"> Create Question </button>
//           </Link>
//         </li>
//         <li>
//           <Link spy={true} smooth={true} offset={50} duration={500} onClick={toggleMenu} to="projects">
//            <button className="navbutton"> Profile</button>
//           </Link>
//         </li>
//         <li>
//           <div>
//         <li>
//         {Auth.loggedIn() ? (
//             <>
//               <Link className="btn btn-lg btn-info m-2" to="/me">
//                 {/* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username  */}
//                 {Auth.getProfile().authenticatedPerson.username}'s profile
//               </Link>
//               <button className="btn btn-lg btn-light m-2" onClick={logout}>
//                 Logout
//               </button>
//             </>
//           ) : (
//           <Link spy={true} smooth={true} offset={50} duration={500} onClick={toggleMenu} to="contact"><button className="navbutton" to="/login">
//            Login</button> 
//           </Link> )} 
//         </li> 
//         </div>
//         </li>
//       </ul>
//     </nav>
//     <div className={`scroll-to-top ${scroll ? "scroll-true" : ''}`}>
//       <Link spy={true} smooth={true} offset={50} duration={1000} to="home">
//         <i className="fa-solid fa-arrow-up"></i>
//       </Link>
//     </div>
//   </>
//   )
//         }
// export default Header;


