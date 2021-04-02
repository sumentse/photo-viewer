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
    nextButton: {
      width: "150px",
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
  };
});

export default useStyles;
