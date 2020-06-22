import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import TestIcon from "./TestIcon";
import Button from "@material-ui/core/Button";
import MakeTestPopup from "./MakeTestPopup";

import TestFieldCell from "./TestFieldCell";

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
}));
const TestTemplateField = ({ testTemplate }) => {
  const styles = useStyles();
  const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false);
  console.log(testTemplate);
  const togglePopup = () => setIsPopupOpened(!isPopupOpened);
  const { createdAt, name, questions, id } = testTemplate;
  const createdDate = moment(createdAt).format("DD-mm-yyyy");
  return (
    <Paper className={styles.mainContent} elevation={2}>
      <Grid container direction="row">
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
    </Paper>
  );
};

export default TestTemplateField;
