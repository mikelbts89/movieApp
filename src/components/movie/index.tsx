import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Trash2, Heart, EmojiFrown } from "react-bootstrap-icons";

import RankStars from "../rank";
import LikesCounter from "../counter";

export interface IMovie {
  Title: string;
  Poster: string;
  Year: string;
  Type: string;
  rank: number;
  imdbID: string;
}

export default function Movie(props: IMovie) {
  return (
    <Card style={{ width: "14rem" }}>
      <Card.Img variant="top" src={props.Poster} />
      <Card.Body>
        <Card.Title>{props.Title} </Card.Title>
        <Card.Text> {props.Year} </Card.Text>
        <RankStars stars={props.rank} />
        <div className="row">
          <LikesCounter text={<Heart />} />
          <LikesCounter text={<EmojiFrown />} />
          <Button variant="danger">
            <Trash2 />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
