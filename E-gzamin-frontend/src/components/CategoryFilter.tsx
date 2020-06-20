import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  content: {
    minWidth: "40%",
    display: "flex",
    flexWrap: "wrap",
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
  },
  search: {
    width: "100%",
  },
}));

type CategoryType = {
  id: number;
  name: string;
};
type CategoriesType = {
  categories: Array<CategoryType>;
  onCategoryClick: (categoryId: number) => (event: unknown) => unknown;
};

const CategoryFilter = ({ categories, onCategoryClick }: CategoriesType) => {
  const styles = useStyles();

  return (
    <div className={styles.content}>
      {categories.map(({ id, name }) => (
        <Box
          className={styles.category}
          component="span"
          key={id}
          m={1}
          onClick={onCategoryClick(id)}
        >
          {name}
        </Box>
      ))}
    </div>
  );
};

export default CategoryFilter;
