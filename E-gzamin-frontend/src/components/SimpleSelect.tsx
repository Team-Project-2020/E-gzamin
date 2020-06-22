import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles(() => ({
  selectContent: {
    minWidth: "250px",
    margin: "20px",
  },
  itemSelect: {
    width: "100%",
  },
}));

type SimpleSelectProps = {
  value: { id: number; name: string } | null;
  onChange: (id: number) => void;
  InputLabelText: string;
  values: Array<{ id; name }>;
  styles?: Record<"selectContent" | "itemSelect", string>;
};
const SimpleSelect = ({ value, onChange, InputLabelText, values, styles }) => {
  const defaultStyles = useStyles();
  const componentStyles = styles || defaultStyles;

  return (
    <div className={componentStyles.selectContent}>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value?.id || -1}
        className={componentStyles.itemSelect}
        onChange={({ target }): void =>
          onChange(values.find(({ id }) => id === target.value))
        }
      >
        <MenuItem value={-1}>{InputLabelText}</MenuItem>
        {values.map(({ id, name }) => (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default SimpleSelect;
