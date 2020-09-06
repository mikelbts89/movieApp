import React, { useState, Component } from "react";
import "./App.css";
import MovieList from "./components/movieList/movieList";
import CustomHeader from "./components/header";
import "./components/header/index.css";
import Button from "react-bootstrap/esm/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import NavDropdown from "react-bootstrap/NavDropdown";
import NavigationApp from "./components/navBar";
import { Routes } from "./data/index";
import { IRoute } from "./interface/IRoute";
import { IRouteList } from "./interface/IRoutList";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

function App() {
  const moviesListArr: Array<any> = [];
  const [movies, setMovies] = useState(moviesListArr);

  function clearMovies() {
    setMovies([]);
  }

  async function getMoviefomAPI(value: string) {
    const movies = `http://www.omdbapi.com/?s=${value}&apikey=4f7462e2&page=2`;
    const result = await fetch(movies);
    const jsonResult = await result.json();
    const finalResult = jsonResult.Search;
    setMovies(finalResult);
  }

  interface IMovieSearch {
    searchOperation: Function;
  }

  function FindMovie(props: IMovieSearch) {
    const [searchValue, setSearchedValue] = useState("");
    const { searchOperation } = props;
    return (
      <div>
        <InputGroup className="search">
          <FormControl
            aria-label="movieName"
            aria-describedby="basic-addon1"
            onChange={(e: any) => setSearchedValue(e.target.value)}
            value={searchValue}
          />
          <Button
            className="searchBarButtons"
            onClick={() => {
              getMoviefomAPI(searchValue);
            }}
          >
            Find Movie
          </Button>
        </InputGroup>
      </div>
    );
  }

  function RouteList(props: IRouteList) {
    return (
      <>
        {props.routeList.map((element: IRoute, index: number) => {
          const { path, component } = element;
          return (
            <Route path={path} component={component} key={`route ${index}`} />
          );
        })}
      </>
    );
  }

  return (
    <div>
      <Router>
        <NavigationApp />
        <div className="container">
          <Switch>
            <RouteList routeList={Routes} />
          </Switch>
        </div>
      </Router>

      <div className="headers">
        <CustomHeader text={"Movies"} />
      </div>
      <div className="container">
        <div className="row">
          <FindMovie searchOperation={getMoviefomAPI} />
          <Button className="searchBarButtons" onClick={clearMovies}>
            Clear Movie List
          </Button>
        </div>
        <MovieList movies={movies} />
      </div>
    </div>
  );
}

export default App;
