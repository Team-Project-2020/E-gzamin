import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Header from "./Header";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import SingleGroupRow from "./SingleGroupRow";
import { Member } from "../types";

const useStyles = makeStyles((theme: Theme) => ({
  groupContent: {
    color: theme.palette.text.primary,
    padding: "20px",
    minWidth: "1100px",
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

  const onRemoveGroup = (groupId) => {
    console.log("remove group", groupId);
  };
  const onLeaveGroup = (groupId) => {
    console.log("leave group", groupId);
  };
  const onCreateGroup = (groupName) => {
    console.log("create group", groupName);
  };
  const onJoinGroup = (groupCode) => {
    console.log("join to the group", groupCode);
  };
  return (
    <>
      <GroupTable
        groups={groups}
        styles={styles}
        headerContent="Created Groups"
        inputPrompt="Group name"
        onRemove={onRemoveGroup}
        onButtonClick={onCreateGroup}
        buttonText="Create group"
        onDeletePrompt="remove group"
      />
      <GroupTable
        groups={groups}
        styles={styles}
        inputPrompt="Group code"
        headerContent="Groups you joined"
        buttonText="Join Group"
        onDeletePrompt="leave"
        onRemove={onLeaveGroup}
        onButtonClick={onJoinGroup}
      />
    </>
  );
};
type Group = {
  id: number;
  name: string;
  code: string;
  members: Array<Member>;
};

type GroupTableProps = {
  groups: Array<Group>;
  styles: Record<
    | "groupContent"
    | "grid"
    | "paper"
    | "createGroup"
    | "createGroupInput"
    | "createGroupButton",
    string
  >;
  buttonText: string;
  inputPrompt: string;
  headerContent: string;
  onRemove: (groupId: number) => void;
  onButtonClick: (input: string) => void;
  onDeletePrompt?: string;
};
const GroupTable = ({
  groups,
  styles,
  headerContent,
  onRemove,
  buttonText,
  inputPrompt,
  onButtonClick,
  onDeletePrompt,
}: GroupTableProps) => {
  const [textFieldValue, setTextFieldValue] = useState<string | undefined>(
    undefined
  );
  return (
    <>
      <Header content={headerContent} />
      <Paper className={styles.paper}>
        <div className={styles.createGroup}>
          <TextField
            className={styles.createGroupInput}
            id="standard-basic"
            value={textFieldValue}
            onChange={({ target }): void => setTextFieldValue(target.value)}
            label={inputPrompt}
          />
          <Button
            className={styles.createGroupButton}
            onClick={() => onButtonClick(textFieldValue)}
            variant="contained"
            color="primary"
          >
            {buttonText}
          </Button>
        </div>
        <div className={styles.grid}>
          {groups.map(({ id, name, code, members }, index) => {
            return (
              <>
                <SingleGroupRow
                  name={name}
                  code={code}
                  members={members}
                  onDelete={id ? () => onRemove(id) : undefined}
                  index={index}
                  onDeletePrompt={onDeletePrompt}
                />
              </>
            );
          })}
        </div>
      </Paper>
    </>
  );
};
export default Group;
