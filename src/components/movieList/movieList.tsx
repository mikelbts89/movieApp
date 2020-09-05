import React from "react";
import Movie, { IMovie } from "../movie";

interface IProps {
  movies: Array<IMovie>;
  noDataMessage?: string;
}

export default function MovieList(props: IProps) {
  const { movies, noDataMessage = "No Data" } = props;
  if (!movies.length) return <h1> {noDataMessage}</h1>;
  return (
    <div className="row">
      {movies.map((movie, index) => {
        return <Movie key={movie.imdbID + index} {...movie} />;
      })}
    </div>
  );
}
