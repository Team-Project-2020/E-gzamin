import React from "react";
import { Link } from "react-router-dom";

function Group() {
  const x: string = "Group";
  return (
    <div className="Group">
      <p>Hello World {x}</p>
      <Link to="/">Go Home</Link>
    </div>
  );
}

export default Group;
