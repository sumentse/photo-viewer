import { makeStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => {
  return {
    photoContainer: {
      background: grey[200],
    },
    nextPageContainer: {
      textAlign: "center",
    },
    paginationButton: {
      width: "120px",
      margin: "0px 10px",
    },
    fab: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      background: "transparent",
      "&:hover": {
        background: "white",
      },
    },
    navigationIcon: {
      color: "black",
    },
    paper: {
      position: "absolute",
      width: "80%",
      background: theme.palette.background.paper,
      padding: "20px",
      margin: "auto",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };
});

export default useStyles;
