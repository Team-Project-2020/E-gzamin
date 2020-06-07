import React, { Props } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Header from "./Header";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import SingleGroupRow from "./SingleGroupRow";

const useStyles = makeStyles((theme: Theme) => ({
  groupContent: {
    color: theme.palette.text.primary,
    padding: "20px",
    width: "80%",
  },
  paper: {
    padding: "20px",
    margin: "20px",
    width: "100%",
  },
  createGroup: {
    display: "flex",
    flexDirection: "row",
    margin: "10px",
    marginLeft: "0px",
  },
  createGroupInput: {
    margin: "15px",
    marginLeft: "0px",
  },
  createGroupButton: {
    margin: "15px",
  },
  grid: {
    display: "grid",
    gridTemplateRows: "50px",
  },
}));

function Group() {
  const styles = useStyles();
  return (
    <div className={styles.groupContent}>
      <_CreatedGroups styles={styles} />
    </div>
  );
}
type _CreatedGroupsPropsType = {
  styles: Record<
    | "groupContent"
    | "grid"
    | "paper"
    | "createGroup"
    | "createGroupInput"
    | "createGroupButton",
    string
  >;
};
const _CreatedGroups: React.FC<_CreatedGroupsPropsType> = (props) => {
  const { styles } = props;
  const groups = [
    { id: undefined, name: "name", code: "code", members: [] },
    { id: 5, name: "math 2k20", code: "50421", members: [] },
    { id: 6, name: "math 2k19", code: "50421", members: [] },
    { id: 7, name: "xdfvdsfgsdf", code: "50421", members: [] },
    { id: 8, name: "xdfvdsfgfdsfsdfsdf", code: "50421", members: [] },
    {
      id: 8,
      name: "xdfvd",
      code: "50421",
      members: [],
    },

    {
      id: 1,
      name: "gfd",
      code: "50422",
      members: [
        {
          id: 1,
          email: "xd@fds.pl",
          firstName: "dfasfasd",
          lastName: "dasfsedrfwe",
        },
        {
          id: 2,
          email: "fdsghdf@fdfsd.pl",
          firstName: "dfasfasd",
          lastName: "dasfsedrfwe",
        },
        {
          id: 3,
          email: "ffdsgsdfghdf@fdfsd.pl",
          firstName: "dfasfasd",
          lastName: "dasfsedrfwe",
        },
      ],
    },
    { id: 15, name: "xdfvdsfgfdsfsdfsdf", code: "50421", members: [] },
  ];
  return (
    <>
      <Header content="Created Groups" />
      <Paper className={styles.paper}>
        <div className={styles.createGroup}>
          <TextField
            className={styles.createGroupInput}
            id="standard-basic"
            value={""}
            onChange={({ target }): void => {}}
            label="Group name"
          />
          <Button
            className={styles.createGroupButton}
            onClick={() => {}}
            variant="contained"
            color="primary"
          >
            CREATE A GROUP
          </Button>
        </div>
        <div className={styles.grid}>
          {groups.map(({ id, name, code, members }, index) => (
            <>
              <SingleGroupRow
                name={name}
                code={code}
                members={members}
                onDelete={id ? (): void => {} : undefined}
                index={index}
              />
            </>
          ))}
        </div>
      </Paper>
    </>
  );
};

export default Group;
