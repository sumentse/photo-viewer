import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  makeStyles,
  IconButton,
  Paper,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import SearchIcon from "@material-ui/icons/Search";
import { useState } from "react";

const useStyles = makeStyles((theme) => {
  return {
    title: {
      flexGrow: 1,
      fontFamily: "Kaushan Script",
      fontSize: "30px",
      color: grey[800],
    },
    search: {
      padding: "0px 10px",
      margin: "0px 10px",
      position: "absolute",
      top: "0",
      right: "0",
      [theme.breakpoints.up("sm")]: {
        position: "absolute",
        top: "10px",
        right: "15px",
      },
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        marginTop: "9px",
        height: "35px",
      },
      [theme.breakpoints.only("xs")]: {
        width: "125px",
      },
    },
  };
});

interface Props {
  title: string;
  onSearch: (input: string) => void;
}

const NavBar = ({ title, onSearch }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const classes = useStyles();

  return (
    <>
      <AppBar
        elevation={0}
        position="relative"
        data-testid="nav-bar"
        color="transparent"
      >
        <Toolbar>
          <Typography
            data-testid="navbar-title"
            variant="h6"
            color="inherit"
            className={classes.title}
          >
            {title}
          </Typography>
          <Paper className={classes.search} elevation={0}>
            <InputBase
              style={{ flexGrow: 1 }}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
              autoFocus
              onKeyPress={(e) => {
                if (e.code === "Enter") {
                  onSearch(searchTerm);
                }
              }}
            />
            <IconButton
              aria-label="search"
              onClick={() => onSearch(searchTerm)}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
