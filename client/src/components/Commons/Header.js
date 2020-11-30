import React, { useState } from "react";
import useAuth from '../../services/api-authentication';

export default function Header() {
  const authenticationService = useAuth();
  if (authenticationService.isSignedIn) {

  }
  return (
    <header className="header-global">
      <nav className="navbar np-element">
        <a className="navbar-brand" href="#">
        🤑 Paridami 🤑
        </a>
        <div className="navbar">
          <a className="nav-link" href="#">Mes paridamis</a>
          {authenticationService.isSignedIn ?
            <button className="np-btn np-square" onClick={authenticationService.signOut}>Logout</button>
            : <></>
          }  
        </div>
      </nav>
    </header>
  );
}