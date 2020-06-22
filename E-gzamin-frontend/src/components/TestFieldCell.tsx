import React from "react";
import Loader from "./Loader";

type TestFieldCellType = {
  label: string;
  value: string | boolean | number | undefined;
};

function TestFieldCell(props: TestFieldCellType) {
  const label = props.label;
  const value = props.value;
  if (value === undefined) return <Loader size={30} />;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "1.3em",
        margin: "auto",
      }}
    >
      <p>{label + ":"}</p>
      <p>{value}</p>
    </div>
  );
}

export default TestFieldCell;
