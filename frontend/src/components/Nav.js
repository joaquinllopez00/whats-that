import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const Nav = () => {
  return (
    <nav>
      <div className="nav__subContainer">
        <h1>What's That?</h1>
      </div>
      <div className="nav__subContainer">
        <FontAwesomeIcon className="icon" icon={faSearch} />
        <input type="text" />
      </div>
    </nav>
  );
};
