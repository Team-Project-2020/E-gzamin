import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { Theme, makeStyles } from "@material-ui/core/styles";
import Header from "./Header";
import getGroups from '../actions/getGroups';
import { useQuery } from 'react-query';
import SingleGroupRow from "./SingleGroupRow";
import { Member, GroupType } from "../types";
import Loader from './Loader';
import useGroups from '../hooks/useGroups'

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
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    borderBottomColor: theme.palette.primary.main,
  },
}));



function Group() {
  const styles = useStyles();
    const { status, data, error, isFetching } = useQuery(
      'getGroups',
      getGroups,
    );

    if (isFetching) {
      return <Loader />;
    }
  
  
  
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
  const groups = useGroups();

  const onRemoveGroup = (groupId) => {
    console.log("remove group", groupId);
    groups.removeGroup({id: groupId});
  };
  const onLeaveGroup = (groupId) => {
    console.log("leave group", groupId);
    groups.leaveGroup({id: groupId});
  };
  const onCreateGroup = (code, name) => {
    console.log("create group", name);
    groups.createGroup({name, code});
  };
  const onJoinGroup = (groupCode) => {
    console.log("join to the group", groupCode);
    groups.joinGroup({groupCode})
  };
  return (
    <>
      <GroupTable
        groups={groups.ownedGroups}
        styles={styles}
        headerContent="Created Groups"
        inputPrompt="Group name"
        codePrompt="Group code"
        onRemove={onRemoveGroup}
        onButtonClick={onCreateGroup}
        buttonText="Create group"
        onDeletePrompt="remove group"
      />
      <GroupTable
        groups={groups.groups}
        styles={styles}
        inputPrompt="Group name"
        codePrompt="Group code"
        headerContent="Groups you joined"
        buttonText="Join Group"
        onDeletePrompt="leave"
        onRemove={onLeaveGroup}
        onButtonClick={onJoinGroup}
      />
    </>
  );
};

type GroupTableProps = {
  groups: Array<GroupType>;
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
  codePrompt: string;
  headerContent: string;
  onRemove: (groupId: number) => void;
  onButtonClick: (input: string, code: string) => void;
  onDeletePrompt?: string;
};
const GroupTable = ({
  groups,
  styles,
  headerContent,
  onRemove,
  buttonText,
  inputPrompt,
  codePrompt,
  onButtonClick,
  onDeletePrompt,
}: GroupTableProps) => {
  const [textFieldValue, setTextFieldValue] = useState<string | undefined>(
    undefined
  );
  const [codeFieldValue, setCodeFieldValue] = useState<string | undefined>(
    undefined
  );
  return (
    <>
      <Header content={headerContent} />
      <Paper className={styles.paper}>
        <div className={styles.createGroup}>
{headerContent !== "Groups you joined" &&          <TextField
            className={styles.createGroupInput}
            id="standard-basic"
            value={textFieldValue}
            onChange={({ target }): void => setTextFieldValue(target.value)}
            label={inputPrompt}
          />}
          <TextField
            className={styles.createGroupInput}
            id="standard-basic"
            value={codeFieldValue}
            onChange={({ target }): void => setCodeFieldValue(target.value)}
            label={codePrompt}
          />
          <Button
            className={styles.createGroupButton}
            onClick={() => onButtonClick(codeFieldValue, textFieldValue)}
            variant="contained"
            color="primary"
          >
            {buttonText}
          </Button>
        </div>
        <div className={styles.grid}>
          {groups.map(({ id, name, groupCode, members }, index) => {
            return (
              <React.Fragment key={index}>
                <SingleGroupRow
                  name={name}
                  code={groupCode}
                  members={members}
                  onDelete={id ? () => onRemove(id) : undefined}
                  index={index}
                  groupId={id}
                  onDeletePrompt={onDeletePrompt}
                />
              </React.Fragment>
            );
          })}
        </div>
      </Paper>
    </>
  );
};
export default Group;
