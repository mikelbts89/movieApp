import React from "react";

interface IHeader {
  text: string;
}

export default function CustomHeader(props: IHeader) {
  return <h1 className={"h1Headers"} >{props.text}</h1>;
}
