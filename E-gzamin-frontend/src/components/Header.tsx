
import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    mainHeaders:{
      color: theme.palette.text.primary,
      margin: "1vh 3vw",
    },
  
  }));
  

type HeaderType = {
    content: string;
  }
  
  function Header(props: HeaderType){
  const {content} = props;
  const styles = useStyles();
  
  return <Typography className={styles.mainHeaders} variant="h3" component="h2">
    {content}
  </Typography>
  }
  
  export default Header;