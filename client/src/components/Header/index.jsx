import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Auth from '../../utils/auth';
import Quizardly from '../../assets/quizardly.png'
import './NavBar.css'

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header>
      <div>
        <div>
          <Link className="" to="/">
       <h1 className="m-0"> <img src={Quizardly} className="q-logo" height="85px" /> </h1>
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
            <div className="navEl">
            <Link to="/quiz"><button className="buttonstyle">
              Create Question</button>
              </Link>
              <Link to="/login"><button className="buttonstyle">
                Login </button>
              </Link>
              <Link to="/signup" >
                <button className="buttonstyle">
                Signup </button>
              </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
