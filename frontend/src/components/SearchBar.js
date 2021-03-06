import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faArrowLeft, faHeart } from "@fortawesome/free-solid-svg-icons";
import { TweenMax, Power3 } from "gsap";

import { Results } from "./Results";

export const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(false);

  const history = useHistory();
  const searchContainerRef = useRef(null);
  const resultsContainerRef = useRef(null);

  const formSubmission = async (e) => {
    e.preventDefault();
    TweenMax.fromTo(
      searchContainerRef.current,
      {
        y: 0,
        opacity: 1,
      },
      {
        y: -10,
        opacity: 0,
        ease: Power3.easeInOut,
      },
    );

    history.push(`/${search}`);

    setTimeout(() => {
      setResults(true);
      TweenMax.fromTo(
        resultsContainerRef.current,
        {
          y: -10,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          ease: Power3.easeIn,
        },
      );
    }, 1000);
  };

  const backOnClick = () => {
    TweenMax.fromTo(
      resultsContainerRef.current,
      {
        x: 0,
        opacity: 1,
      },
      {
        x: 100,
        opacity: 0,
        ease: Power3.easeIn,
      },
    );

    history.push(`/${search}`);

    setTimeout(() => {
      setResults(false);
      TweenMax.fromTo(
        searchContainerRef.current,
        {
          x: -100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          ease: Power3.easeInOut,
        },
      );
    }, 1000);
  };

  return (
    <>
      {results ? (
        <div className="searchResults__container" ref={resultsContainerRef}>
          <h1>
            <FontAwesomeIcon icon={faArrowLeft} className="arrowLeft" onClick={() => backOnClick()} />
            What's <h1 id="whats">{search + "?"}</h1>
          </h1>
          <div className="searchResults-content__container">
            <Results keyword={search} />
          </div>
        </div>
      ) : (
        <div className="searchBar__container" ref={searchContainerRef}>
          <div className="search__subContainer">
            <h1>What's That?</h1>
          </div>
          <div className="search__subContainer">
            <div className="search-input__container">
              <form onSubmit={(e) => formSubmission(e)}>
                <input
                  className="search-input"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <FontAwesomeIcon className="icon" icon={faSearch} />
              </form>
            </div>
            <div className="footer__container">
              <FontAwesomeIcon icon={faHeart} />
              <p>
                Made with love by{" "}
                <a href="https://www.linkedin.com/in/joaquin-lopez-a955451a8/" target="__blank">
                  Joaquin
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
