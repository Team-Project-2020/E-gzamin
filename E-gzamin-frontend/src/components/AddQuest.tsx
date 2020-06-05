import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import "./AddQuest.css";
import QuestionsTable from "./QuestionsTable";

const useStyles = makeStyles((theme) => ({
  addQuest: {
    width: "inherit",
    backgroundColor: theme.palette.background.default,
  },
}));

function AddQuest() {
  const styles = useStyles();

  const x: string = "AddQuest";
  return (
    <div className={styles.addQuest}>
      <QuestionsTable
        questions={[
          {
            id: 0,
            question:
              "How much does an average male german shepherd (dog) weigh?",
          },
          {
            id: 1,
            question:
              "How much does an average male german shepherd (dog) weigh How much does an average male german shepherd (dog) weigh?",
          },
          { id: 2, question: "fdsfsdfsdfsdfs" },
          { id: 3, question: "fdsfgsdgsfdgsdgfsd" },
          { id: 4, question: "fdsfsdfsdfsdfs" },
          { id: 5, question: "fdsfgsdgsfdgsdgfsd" },
          { id: 6, question: "fdsfsdfsdfsdfs" },
          { id: 7, question: "fdsfgsdgsfdgsdgfsd" },
          { id: 8, question: "fdsfsdfsdfsdfs" },
          { id: 9, question: "fdsfgsdgsfdgsdgfsd" },
          { id: 10, question: "fdsfsdfsdfsdfs" },
          { id: 11, question: "fdsfgsdgsfdgsdgfsd" },
          { id: 12, question: "fdsfsdfsdfsdfs" },
          { id: 13, question: "fdsfgsdgsfdgsdgfsd" },
          { id: 14, question: "fdsfsdfsdfsdfs" },
          { id: 15, question: "fdsfgsdgsfdgsdgfsd" },
          { id: 16, question: "fdsfsdfsdfsdfs" },
          { id: 17, question: "fdsfgsdgsfdgsdgfsd" },
          { id: 18, question: "fdsfsdfsdfsdfs" },
          { id: 19, question: "fdsfgsdgsfdgsdgfsd" },
          { id: 20, question: "fdsfsdfsdfsdfs" },
          { id: 21, question: "fdsfgsdgsfdgsdgfsd" },
          { id: 22, question: "fdsfsdfsdfsdfs" },
          { id: 23, question: "fdsfgsdgsfdgsdgfsd" },
        ]}
      />
    </div>
  );
}

export default AddQuest;
