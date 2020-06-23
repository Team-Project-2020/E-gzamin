import { makeStyles, Theme } from "@material-ui/core/styles";
import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import useCategories from "../hooks/useCategories";
import CourseSelect from "./CourseSelect";
import { CourseType } from "../types";
import classnames from "classnames";

const useStyles = makeStyles((theme) => ({
  content: {
    minWidth: "40%",
    display: "flex",
    flexWrap: "wrap",
    marginBottom: "20px",
  },
  questions: {
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    height: "90%",
  },
  category: {
    cursor: "pointer",
    border: "1px solid red",
    borderColor: theme.palette.text.secondary,
    borderRadius: "20px",
    padding: "3px 13px",
    fontSize: "12px",
    color: theme.palette.text.secondary,
    "&:hover": {
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
    "&.isSelected": {
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
  },
  search: {
    width: "100%",
  },
  singleSpace: {
    width: "100%",
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    borderBottomColor: theme.palette.primary.main,
  },
  removeCourseButton: {
    marginLeft: "25px",
  },
  courseButtons: {
    marginBottom: "15px",
  },
}));

type CategoryType = {
  id: number;
  name: string;
};
type CategoriesType = {
  onCategoryClick: (categoryId: number) => (event: unknown) => unknown;
  selectedCategories: Array<number>;
};

const CategoryFilter = ({
  onCategoryClick,
  selectedCategories,
}: CategoriesType) => {
  const { categories, createCategory, removeCategory } = useCategories();
  const styles = useStyles();
  const [isAddCoursePopupOpened, setAddCoursePopupOpened] = useState<boolean>(
    false
  );
  const toggleAddCoursePopup = (): void =>
    setAddCoursePopupOpened(!isAddCoursePopupOpened);

  const [isRemoveCoursePopupOpened, setRemoveCoursePopupOpened] = useState<
    boolean
  >(false);

  const isSelected = (id) => selectedCategories.includes(id);

  const toggleRemoveCoursePopup = (): void =>
    setRemoveCoursePopupOpened(!isRemoveCoursePopupOpened);
  return (
    <div className={styles.content}>
      <Grid
        container
        alignContent="space-between"
        direction="row"
        className={styles.courseButtons}
      >
        <Button
          onClick={toggleAddCoursePopup}
          variant="contained"
          color="primary"
        >
          ADD COURSE
        </Button>
        <Button
          onClick={toggleRemoveCoursePopup}
          className={styles.removeCourseButton}
          variant="contained"
          color="primary"
        >
          REMOVE COURSE
        </Button>
      </Grid>

      {categories.map(({ id, name }) => (
        <Box
          className={classnames(styles.category, {
            isSelected: isSelected(id),
          })}
          component="span"
          key={id}
          m={1}
          onClick={onCategoryClick(id)}
        >
          {name}
        </Box>
      ))}
      <div className={styles.singleSpace}></div>
      <AddCoursePopup
        open={isAddCoursePopupOpened}
        onClose={toggleAddCoursePopup}
        onSubmit={createCategory}
      />
      <RemoveCoursePopup
        open={isRemoveCoursePopupOpened}
        onClose={toggleRemoveCoursePopup}
        onSubmit={removeCategory}
      />
    </div>
  );
};

type AddCoursePopupProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string) => Promise<any>;
};

const usePopupStyles = makeStyles((theme: Theme) => ({
  addCoursePopup: {
    padding: "20px",
    margin: "20px",
    minHeight: "300px",
    width: "500px",
  },
}));

const AddCoursePopup = ({ open, onClose, onSubmit }: AddCoursePopupProps) => {
  const [courseName, setCourseName] = useState<string>(undefined);
  const styles = usePopupStyles();
  const onClick = () => {
    onSubmit(courseName);
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <Grid
        container
        className={styles.addCoursePopup}
        direction="column"
        justify="space-between"
      >
        <TextField
          id="standard-basic"
          value={courseName}
          onChange={({ target }): void => setCourseName(target.value)}
          label="Course name"
        />
        <Button onClick={onClick} variant="contained" color="primary">
          ADD COURSE
        </Button>
      </Grid>
    </Dialog>
  );
};

const RemoveCoursePopup = ({
  open,
  onClose,
  onSubmit,
}: AddCoursePopupProps) => {
  const styles = usePopupStyles();
  const [selectedCourse, setCourse] = useState<undefined | CourseType>(
    undefined
  );
  const { categories: courses } = useCategories();

  const onClick = () => {
    selectedCourse &&
      selectedCourse.id &&
      onSubmit(selectedCourse.id.toString());
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <Grid
        container
        className={styles.addCoursePopup}
        direction="column"
        justify="space-between"
      >
        <CourseSelect
          value={selectedCourse}
          onChange={setCourse}
          courses={courses}
        />
        <Button onClick={onClick} variant="contained" color="primary">
          REMOVE COURSE
        </Button>
      </Grid>
    </Dialog>
  );
};

export default CategoryFilter;
