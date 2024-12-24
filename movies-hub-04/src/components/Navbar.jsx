import { useEffect, useRef } from "react";
import { useKey } from "./useKey";

function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function SearchBar({ searchData, onSearchQuery }) {
  const inputEle = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEle.current) return;
    inputEle.current.focus();
    onSearchQuery("");
  });

  useEffect(() => {
    if (inputEle.current) {
      inputEle.current.focus();
    }
  }, []);

  // useEffect(() => {
  //   function callBack(e) {
  //     if (document.activeElement === inputEle.current) return;
  //     if (e.code !== "Enter") return;
  //     inputEle.current.focus();
  //     onSearchQuery("");
  //   }

  //   document.addEventListener("keydown", callBack);
  //   return () => document.removeEventListener("keydown", callBack);
  // }, [onSearchQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies ex. Social Network"
      value={searchData}
      onChange={(e) => onSearchQuery(e.target.value)}
      ref={inputEle}
    />
  );
}

function SearchBarResult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies?.length}</strong> results
    </p>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

export { Logo, NavBar, SearchBarResult, SearchBar };
