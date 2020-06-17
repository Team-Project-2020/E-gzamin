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
};
const CourseSelect: React.FC<CourseSelectType> = ({
  courses,
  styles,
}: CourseSelectType) => {
  const defaultStyles = useStyles();
  const componentStyles = styles || defaultStyles;

  const [selected, setSelected] = useState<undefined | CourseType>(undefined);
  return (
    <div className={componentStyles.courseSelect}>
      <InputLabel>Course</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selected}
        className={componentStyles.courseSelectSelect}
        onChange={({ target }): void =>
          setSelected(courses.find(({ id }) => id === target.value))
        }
      >
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
