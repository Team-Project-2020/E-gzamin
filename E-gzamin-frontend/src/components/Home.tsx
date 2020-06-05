import React from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HighlightOffTwoToneIcon from "@material-ui/icons/HighlightOffTwoTone";
import HelpOutlineTwoToneIcon from "@material-ui/icons/HelpOutlineTwoTone";
import test_icon from "../pictures/test_icon.svg";
import Paper from "@material-ui/core/Paper";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  mainContent: {
    width: "100%",
    backgroundColor: theme.palette.background.default,
  },
}));


type TestFieldType = {
  subject: string;
  owner: string;
  pub_date: string;
  result: string;
  result_positive: boolean;
  attempts: number;
  available_attempts: number;
  deadline: string;
  time: number;
};

type StatusPicType = {
  status: string;
};

function StatusIcon(props: StatusPicType) {
  const status = props.status;
  if (status === "todo") {
    return <HelpOutlineTwoToneIcon style={{ color: "yellow" }} />;
  }
  if (status === "failed") {
    return <HighlightOffTwoToneIcon style={{ color: "#ff4545" }} />;
  }
  if (status === "passed") {
    return <CheckCircleIcon style={{ color: "lightgreen" }} />;
  }
  return null;
}

type TestIconType = {
  status: "todo" | "failed" | "passed";
};

function TestIcon(props: TestIconType) {
  const status = props.status;
  return (
    <div className="test-icon">
      <img src={test_icon} alt="Test icon" />
      <StatusIcon status={status} />
    </div>
  );
}

type TestFieldCellType = {
  label: string;
  value: string|boolean|number;
}

function TestFieldCell(props:TestFieldCellType){
  const label = props.label;
  const value = props.value;

  return <div style={{display:'flex', flexDirection:'column', padding:'1.3em'}}>
    <p>{label+":"}</p>
    <p>{value}</p>
  </div>
}

function TestField(props: TestFieldType) {
  const styles = useStyles();
  const {
    subject,
    owner,
    pub_date,
    result,
    result_positive,
    attempts,
    available_attempts,
    deadline,
    time,
  } = props;

  let field = (
    <div className={`styles.mainContent, paper`}>
      <Paper elevation={2}>
        <div className="flex-container">
        <TestIcon status={available_attempts==attempts?"todo":result_positive?"passed":"failed"} />
          <TestFieldCell label="Subject" value={subject}/>
          <TestFieldCell label="Author" value={owner}/>
          <TestFieldCell label="Publicated" value={pub_date}/>
          <TestFieldCell label="Deadline" value={deadline}/>
          <TestFieldCell label="Score" value={result}/>
          <TestFieldCell label="Result" value={result_positive?"Passed":"Failed"}/>
          <TestFieldCell label="Attempts" value={attempts+"/"+available_attempts}/>
          <TestFieldCell label="Time" value={time+" min"}/>
        </div>
      </Paper>
    </div>
  );

  return field;
}

function Home() {
  const x: string = "Home";
  return (
    <div className="Home-content">
      <p>Hello World {x}</p>
      <h1>TODO</h1>
      <TestField
        subject="Pszyrka"
        owner="Janusz"
        pub_date="21.37.1410"
        result="123/1500"
        result_positive={false}
        attempts={3}
        available_attempts={3}
        deadline="29.02.2021"
        time={20}
      />
    </div>
  );
}

export default Home;
