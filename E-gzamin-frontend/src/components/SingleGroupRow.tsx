import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

type SingleGroupRowProps = {
  name: string;
  code: string;
  members: Array<{ email: string }>;
  onDelete?: () => void | undefined;
  index: number;
};
const useStyles = makeStyles(() => ({
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
}));
const SingleGroupRow: React.FC<SingleGroupRowProps> = (props) => {
  const { name, code, members, onDelete, index } = props;
  const styles = useStyles();
  return (
    <>
      <GroupRowItem
        content={name}
        className={styles.itemName}
        style={{ gridRow: index * 2 + 1 }}
      />
      <GroupRowItem
        content={code}
        className={styles.itemCode}
        style={{ gridRow: index * 2 + 1 }}
      />
      {onDelete && (
        <IconButton
          className={styles.itemDelete}
          aria-label="delete"
          color="default"
          onClick={onDelete}
          style={{ gridRow: index * 2 + 1 }}
        >
          <DeleteIcon />
        </IconButton>
      )}
    </>
  );
};

type GroupRowItemProps = {
  content: string;
  className: string;
  style: any;
};
const GroupRowItem: React.FC<GroupRowItemProps> = ({
  content,
  className,
  style,
}) => {
  return (
    <div className={className} style={style}>
      {content}
    </div>
  );
};

export default SingleGroupRow;
