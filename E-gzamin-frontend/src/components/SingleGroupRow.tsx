import React, { useState } from "react";

import { makeStyles, Theme } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Collapse from "@material-ui/core/Collapse";
import GroupMembersTable from "./GroupMembersTable";
import { Member } from "../types";

type SingleGroupRowProps = {
  name: string;
  code: string;
  members: Array<Member>;
  onDelete?: (groupId) => void | undefined;
  index: number;
  groupId:number;
  onDeletePrompt?: string;
};
const useStyles = makeStyles((theme: Theme) => ({
  groupRowItem: {
    margin: "auto",
  },
  grid: {},
  itemCode: {
    gridArea: "code",
    margin: "auto",
    gridColumn: "2",
    padding: "10px 0px",
  },
  clickable: {
    cursor: "pointer",
  },
  itemName: {
    gridArea: "name",
    margin: "auto",
    gridColumn: "1",
    padding: "10px 0px",
  },
  itemDelete: {
    gridArea: "delete",
    margin: "auto",
    gridColumn: "3",
  },
  singleGroupSpace: {
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    borderBottomColor: theme.palette.primary.main,
    gridArea: "space",
    gridColumn: "1 / 4",
  },
  collapse: {
    borderTopWidth: "2px",
    borderTopStyle: "solid",
    borderTopColor: theme.palette.primary.main,
  }
}));
const SingleGroupRow: React.FC<SingleGroupRowProps> = (props) => {
  const { name, code, members, onDelete, index, onDeletePrompt, groupId } = props;
  const styles = useStyles();
  const [isOpen, setOpen] = useState<boolean>(false);
  const toggleOpen = (): void => setOpen(!isOpen);

  return (
    <>
      <GroupRowItem
        content={name}
        className={`${styles.itemName} ${onDelete && styles.clickable}`}
        style={{ gridRow: index * 3 + 1 }}
        onClick={toggleOpen}
      />
      <GroupRowItem
        content={code}
        className={`${styles.itemCode} ${onDelete && styles.clickable}`}
        style={{ gridRow: index * 3 + 1 }}
        onClick={toggleOpen}
      />
      {(onDelete && (
        <IconButton
          className={styles.itemDelete}
          aria-label="delete"
          color="default"
          onClick={onDelete}
          style={{ gridRow: index * 3 + 1 }}
        >
          <DeleteIcon />
        </IconButton>
      )) || (
        <GroupRowItem
          content={onDeletePrompt}
          className={`${styles.itemDelete} ${onDelete && styles.clickable}`}
          style={{ gridRow: index * 3 + 1 }}
          onClick={toggleOpen}
        />
      )}
      {index * 2 !== 0 && (
        <div
          className={styles.singleGroupSpace}
          style={{ gridRow: index * 3 }}
        ></div>
      )}
      {onDelete && (
        <Collapse
          className={styles.collapse}
          style={{
            gridColumn: "1 / 4", 
            gridRow: index * 3 + 2,}}
          in={isOpen}
        >
          <GroupMembersTable groupId={groupId} />
        </Collapse>
      )}
    </>
  );
};

type GroupRowItemProps = {
  content: string;
  className: string;
  style: any;
  onClick?: () => void;
};
const GroupRowItem: React.FC<GroupRowItemProps> = ({
  content,
  className,
  style,
  onClick,
}) => {
  return (
    <div className={className} onClick={onClick} style={style}>
      {content}
    </div>
  );
};

export default SingleGroupRow;
