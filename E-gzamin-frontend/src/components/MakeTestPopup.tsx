import React, { useState, ReactElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import InputAdornment from "@material-ui/core/InputAdornment";
import { QuestionType } from "../types";

const useStyles = makeStyles((theme) => ({
  mainContent: {
    minWidth: "400px",
    minHeight: "400px",
  },
  paper: {
    margin: "30px",
    display: "flex",
    flexDirection: "column",
  },
  input: {
    margin: "15px 5px",
    width: "100%",
  },
  generateTestButton: {
    margin: "20px",
  },
  inputAdornment: {
    color: theme.palette.text.secondary,
  },
}));

type MakeTestPopupPropsType = {
  open: boolean;
  onClose: () => void;
  test: { questions: Array<QuestionType> };
};
const MakeTestPopup = ({
  open,
  onClose,
  test,
}: MakeTestPopupPropsType): ReactElement => {
  const styles = useStyles();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [finishDate, setFinishDate] = useState<Date | null>(null);
  const [threshold, setThreshold] = useState<number | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const [questionsPerUser, setQuestionsPerUser] = useState<number | null>(null);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Dialog
        className={styles.mainContent}
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
      >
        <div className={styles.paper}>
          <DateTimePicker
            label="Start time"
            ampm={false}
            className={styles.input}
            disablePast
            value={startDate}
            onChange={setStartDate}
          />

          <DateTimePicker
            className={styles.input}
            ampm={false}
            label="finish time"
            disablePast
            value={finishDate}
            onChange={setFinishDate}
          />

          <TextField
            className={styles.input}
            id="standard-basic"
            value={threshold}
            onChange={({ target }) => setThreshold(Number(target.value))}
            type="number"
            label="time for test"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">minutes</InputAdornment>
              ),
            }}
          />
          <TextField
            className={styles.input}
            id="standard-basic"
            value={time}
            onChange={({ target }) => setTime(Number(target.value))}
            label="passing threshold"
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
          />
          <TextField
            className={styles.input}
            id="standard-basic"
            value={questionsPerUser}
            onChange={({ target }) => setQuestionsPerUser(Number(target.value))}
            label="questions per user"
            type="number"
            InputProps={{
              endAdornment: (
                <InputAdornment
                  className={styles.inputAdornment}
                  position="end"
                >
                  out of {test.questions.length}
                </InputAdornment>
              ),
            }}
          />
        </div>
        <Button
          onClick={() => {}}
          className={styles.generateTestButton}
          variant="contained"
          color="primary"
        >
          GENERATE TEST
        </Button>
      </Dialog>
    </MuiPickersUtilsProvider>
  );
};

export default MakeTestPopup;
