import React from "react";

export default function Header() {
  return (
    <header className="header-global">
      <nav className="navbar np-element">
        <a className="navbar-brand" href="#">
        🤑 Paridami 🤑
        </a>
        <div>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">Mes paridamis</a>
            </li>      
          </ul>
        </div>
      </nav>
    </header>
  );
}