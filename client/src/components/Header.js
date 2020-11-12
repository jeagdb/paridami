import React from "react";

export default function Header() {
  return (
    <header class="header-global">
      <nav class="navbar navbar-expand-lg np-element">
        <a class="navbar-brand" href="#">
          Paridami
        </a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link" href="#">Zones de paris</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Mes paris</a>
            </li>              
          </ul>
          <button class="np-btn ml-auto d-md-none" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon">+</span>
          </button>
        </div>
      </nav>
    </header>
  );
}