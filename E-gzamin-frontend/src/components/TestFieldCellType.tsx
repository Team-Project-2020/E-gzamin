import React from "react";

type TestFieldCellType = {
  label: string;
  value: string | boolean | number;
};

function TestFieldCell(props: TestFieldCellType) {
  const label = props.label;
  const value = props.value;

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "1.3em" }}>
      <p>{label + ":"}</p>
      <p>{value}</p>
    </div>
  );
}

export default TestFieldCell;
