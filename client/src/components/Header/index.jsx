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
          
      <a href="/"> <img src={Quizardly} className="q-logo" height="85px" /> </a>
  
        </div>
        <div>
          {Auth.loggedIn() ? (
            <div class="navEl">
              <Link to="/create"><button className="btn btn-lg btn-info m-2">
              Create Question</button>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {/* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username  */}
                {Auth.getProfile().authenticatedPerson.username}'s profile
              </Link>
              <button className="btn btn-lg btn-info m-2" onClick={logout}>
                Logout
              </button>                         
              </Link>
            </div>
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
