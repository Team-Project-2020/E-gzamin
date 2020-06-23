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
import useDesignates from "../hooks/useDesignates";
import useGroups from "../hooks/useGroups";
import SimpleSelect from "./SimpleSelect";

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
  selectContent: {
    width: "100%",
    margin:"15px 5px",
  },
  itemSelect: {
    width: "100%",
  },
}));

type MakeTestPopupPropsType = {
  open: boolean;
  onClose: () => void;
  testTemplate: { id: number; name: string; questions: Array<number> };
};
const convertToTwoDigits = (time: number, maxValue: number) => {
  if (time.toString().length === 1) return `0${time}`;
  return time % maxValue;
};
const MakeTestPopup = ({
  open,
  onClose,
  testTemplate,
}: MakeTestPopupPropsType): ReactElement => {
  const styles = useStyles();
  const {  createDesignate } = useDesignates();
  const { ownedGroups } = useGroups();
  const [groupTest, setGroupTest] = useState(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [finishDate, setFinishDate] = useState<Date | null>(null);
  const [threshold, setThreshold] = useState<number | null>(null);
  const [time, setTime] = useState<number | null>(null);

  const isButtonDisabled =
    !time || !threshold || !startDate || !finishDate || !groupTest;

  const handleSubmit = async () => {

    createDesignate({
      time,
      passReq: (threshold / 100).toString(),
      startDate,
      endDate: finishDate,
      group_id: groupTest.id,
      testTemplate_id: testTemplate.id,
    });
    onClose();
  };
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
            value={time}
            onChange={({ target }) => setTime(Number(target.value))}
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
            value={threshold}
            onChange={({ target }) => setThreshold(Number(target.value))}
            label="passing threshold"
            type="number"
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
          />
          <SimpleSelect
            value={groupTest}
            styles={styles}
            onChange={setGroupTest}
            InputLabelText={"Select group"}
            values={ownedGroups}
          />
        </div>
        <Button
          onClick={handleSubmit}
          disabled={isButtonDisabled}
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
