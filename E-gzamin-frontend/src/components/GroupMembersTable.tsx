import React, { useState, ReactElement } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Header from "./Header";

import { Member, GroupMembers } from "../types";
import useGroupMembers from "../hooks/useGroupMembers";
import { number } from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import removeGroupMember from "../actions/removeGroupMember"
import getCurrentUser from "../actions/getCurrentUser"

const useStyles = makeStyles((theme: Theme) => ({
  membersTable: {
    display: "grid",
    width: "80%",
    marginLeft: "auto",
  },
  rowItem: {
    textAlign: "center",
    paddingBottom: "10px",
  },
  header: {
    paddingLeft: "15%",
  },
  membersTableHeader: {
    padding: "5px",
    fontSize: "18px",
    fontWeight: "bold",
  },
  space: {
    height: "20px",
  },
  itemDelete: {
    gridArea: "delete",
    margin: "auto",
    gridColumn: "3",
  },
}));
const GroupMembersTable: React.FC<any> = ({ groupId }: { groupId: number }) => {
  const styles = useStyles();
  const header = {
    id: undefined,
    first_name: "First name",
    last_name: "Last name",
    username: "Email",
  };

  const { groupMembers } = useGroupMembers({ id: groupId });
  if (!groupMembers.length)
    return (
      <div className={styles.rowItem}>
        This group is empty or you don't have the privileges to see the members
      </div>
    );

  return (
    <>
      <Header className={styles.header} content="Members" variant="h6" />

      <div className={styles.membersTable}>
        {[header, ...groupMembers].map(
          (member, index) => {
            const {id, first_name, last_name, username} = member
            console.log(member)
            return (
            <React.Fragment key={index}>
              <MembersTableRowItem
                content={first_name || "Unknown"}
                className={`${styles.membersTable} ${id === undefined &&
                  styles.membersTableHeader}`}
                style={{ gridRow: index + 1, gridColumn: 1 }}
              />
              <MembersTableRowItem
                content={last_name || "Unknown"}
                className={`${styles.membersTable} ${id === undefined &&
                  styles.membersTableHeader}`}
                style={{ gridRow: index + 1, gridColumn: 2 }}
              />
              <MembersTableRowItem
                content={username}
                className={`${styles.membersTable} ${id === undefined &&
                  styles.membersTableHeader}`}
                style={{ gridRow: index + 1, gridColumn: 3 }}
              />
              <IconButton
                  className={styles.itemDelete}
                  aria-label="delete"
                  color="default"
                  onClick={() => removeGroupMember({id: groupId, userId: id})}
                  style={{ gridRow: index + 1, gridColumn: 4 }}
                >
                  <DeleteIcon />
              </IconButton>
            </React.Fragment>
          )}
        )}
        <div className={styles.space} />
      </div>
    </>
  );
};

const MembersTableRowItem = ({
  content,
  style,
  className,
}: {
  content: any;
  style: any;
  className: string;
}): ReactElement => {
  return (
    <div className={className} style={style}>
      {content}
    </div>
  );
};

export default GroupMembersTable;
