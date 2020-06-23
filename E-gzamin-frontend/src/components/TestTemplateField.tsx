import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import TestIcon from "./TestIcon";
import Button from "@material-ui/core/Button";
import MakeTestPopup from "./MakeTestPopup";

import TestFieldCell from "./TestFieldCell";
import { Collapse } from "@material-ui/core";
import QuestionContent from "./QuestionContent"
import useQuestions from "../hooks/useQuestions"
import formatDate from "../lib/formatDate";

const useStyles = makeStyles((theme) => ({
  mainContent: {
    width: "80%",
    marginLeft: "5%",
    paddingLeft: "20px",
    paddingRight: "20px",
    marginBottom: "20px",
    marginTop: "20px",
  },
  mainHeaders: {
    color: theme.palette.text.primary,
  },
  testIcon: {
    fill: theme.palette.text.primary,
  },
  button: {
    margin: "auto",
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: "20px",
    margin: "20px",
    height: "80%",
    minWidth: "40%",
    maxWidth: "65%",
  },
  testName: {
    width: "100%",
    margin: "10px 0px",
  },
  QuestionContent: {
    margin: "15px 0px",
    padding: "15px 0px",
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    borderBottomColor: theme.palette.primary.main,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  QuestionContentLeft: {},
  QuestionContentRight: {},
}));
const TestTemplateField = ({ testTemplate }) => {
  const styles = useStyles();
  const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false);
  const togglePopup = () => setIsPopupOpened(!isPopupOpened);
  const { createdAt, name, questions: questionIds, id } = testTemplate;
  const createdDate = formatDate(createdAt);
  const [isOpen, setOpen] = useState<boolean>(false);
  const toggleOpen = (): void => setOpen(!isOpen);
  const { questions } = useQuestions();
  const filteredQuestions = questions.filter((q) => questionIds.includes(q.id));
  return (
    <Paper className={styles.mainContent} elevation={2}>
      <Grid 
      container 
      direction="row" 
      onClick={toggleOpen}>
        <TestIcon />
        <TestFieldCell label="template name" value={name} />
        <TestFieldCell label="Created" value={createdDate} />
        <Button
          className={styles.button}
          onClick={togglePopup}
          variant="contained"
          color="primary"
        >
          USE Template
        </Button>
      </Grid>
      <MakeTestPopup
        testTemplate={testTemplate}
        open={isPopupOpened}
        onClose={togglePopup}
      />
      <Collapse
        style={{
          gridColumn: "1 / 4", gridRow: 2
        }}
        in={isOpen}
      >
        {filteredQuestions.map((question, index) => (
          <React.Fragment key={index}>
            <QuestionContent
              key={question.id}
              styles={styles}
              question={question.content}
              answers={question.answers || []}
              onDelete={undefined}
            />
          </React.Fragment>
        ))}
      </Collapse>
    </Paper>
  );
};

export default TestTemplateField;
