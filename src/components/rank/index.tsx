import React from "react";
import { Star } from "react-bootstrap-icons";

interface IRankStars {
  stars: number;
}

export default function RankStars(props: IRankStars) {
  const numberOfStars = new Array(props.stars).fill(true, 0);
  return (
    <div>
      {numberOfStars.map((_, index) => (
        <Star key={index} />
      ))}
    </div>
  );
}
