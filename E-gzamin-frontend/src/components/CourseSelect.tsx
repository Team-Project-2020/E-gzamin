import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles(() => ({
  courseSelect: {
    minWidth: "250px",
    margin: "20px",
  },
  courseSelectSelect: {
    width: "100%",
  },
}));

type CourseType = {
  id: number;
  name: string;
};
type CourseSelectType = {
  courses: Array<CourseType>;
  styles?: Record<"courseSelect" | "courseSelectSelect", string>;
  value: undefined | CourseType;
  onChange: (course: CourseType) => void;
};

const CourseSelect: React.FC<CourseSelectType> = ({
  courses,
  styles,
  value,
  onChange,
}: CourseSelectType) => {
  const defaultStyles = useStyles();
  const componentStyles = styles || defaultStyles;
  
  return (
    <div className={componentStyles.courseSelect}>
      <InputLabel>Course</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value?.id || -1}
        className={componentStyles.courseSelectSelect}
        onChange={({ target }): void =>
          onChange(courses.find(({ id }) => id === target.value))
        }
      >
        <MenuItem value={-1}>Select course</MenuItem>
        {courses.map(({ id, name }) => (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default CourseSelect;
