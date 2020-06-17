import React, { useState, ReactElement } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Header from "./Header";

import { Member } from "../types";

type MembersTableProps = {
  members: Array<Member>;
};
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
  },
  space: {
    height: "20px",
  },
}));
const GroupMembersTable: React.FC<MembersTableProps> = ({ members }) => {
  const styles = useStyles();
  const header = {
    id: undefined,
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
  };
  if (!members.length)
    return (
      <div className={styles.rowItem}>
        This group is empty or you don't have the privileges to see the members
      </div>
    );

  return (
    <>
      <Header className={styles.header} content="Members" variant="h6" />

      <div className={styles.membersTable}>
        {[header, ...members].map(
          ({ id, firstName, lastName, email }, index) => (
            <React.Fragment key={index}>
              <MembersTableRowItem
                content={firstName}
                className={`${styles.membersTable} ${id === undefined &&
                  styles.membersTableHeader}`}
                style={{ gridRow: index + 1, gridColumn: 1 }}
              />
              <MembersTableRowItem
                content={lastName}
                className={`${styles.membersTable} ${id === undefined &&
                  styles.membersTableHeader}`}
                style={{ gridRow: index + 1, gridColumn: 2 }}
              />
              <MembersTableRowItem
                content={email}
                className={`${styles.membersTable} ${id === undefined &&
                  styles.membersTableHeader}`}
                style={{ gridRow: index + 1, gridColumn: 3 }}
              />
            </React.Fragment>
          )
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
  content: string;
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
