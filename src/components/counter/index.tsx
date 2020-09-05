import React, { useState } from "react";
import Button from "react-bootstrap/Button";

interface IButton {
  text: any;
}

export default function LikesCounter(props: IButton) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Button onClick={() => setCount(count + 1)}>
        {props.text} {count}
      </Button>
    </div>
  );
}
