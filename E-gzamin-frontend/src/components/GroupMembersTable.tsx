import React, { useState, ReactElement } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Header from "./Header";

type Member = {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
};
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
    return <div className={styles.rowItem}>This group is empty</div>;

  return (
    <>
      <Header className={styles.header} content="Members" variant="h6" />

      <div className={styles.membersTable}>
        {[header, ...members].map(
          ({ id, firstName, lastName, email }, index) => (
            <>
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
            </>
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
