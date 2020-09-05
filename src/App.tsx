import React, { useState } from "react";
import "./App.css";
import MovieList from "./components/movieList/movieList";
import CustomHeader from "./components/header";
import "./components/header/index.css";
import Button from "react-bootstrap/esm/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

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

  return (
    <div className="container">
      <div></div>
      <div className="headers">
        <CustomHeader text={"Movies"} />
      </div>
      <div className="row">
        <FindMovie searchOperation={getMoviefomAPI} />
        <Button className="searchBarButtons" onClick={clearMovies}>
          Clear Movie List
        </Button>
      </div>
      <MovieList movies={movies} />
    </div>
  );
}

export default App;
