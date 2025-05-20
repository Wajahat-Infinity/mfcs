import {
  Divider,
  Link,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

const PersonProfile = ({ imgSrc, name, description }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <div className={classes.body}>
        <div className="image-container">
          <img src={imgSrc} className={classes.image} alt={name} />
        </div>
        <div>
          <Typography className={classes.title}>{name}</Typography>
          <Divider />
          <Typography className={classes.description}>{description}</Typography>
        </div>
      </div>

      <Divider />
      <div className={classes.footer}>
        <Link
          href="https://www.google.com"
          target="_blank"
          rel="noreferrer"
          className="link"
        >
          <LinkedInIcon className="icon" /> <span>Reach {name}</span>
        </Link>
      </div>
    </Paper>
  );
};

export default PersonProfile;

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "0px 0px 8px 0px #26262663 ",
    [theme.breakpoints.up("sm")]: {
      margin: 5,
    },
    marginBottom: theme.spacing(1.8),
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  body: {
    textAlign: "center",
    "& .image-container": {
      marginBottom: theme.spacing(1.5),
    },
  },
  title: {
    fontWeight: 600,
  },
  description: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    textAlign: "justify",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: "100%",
    border: "2px solid",
    transition: theme.transitions.create("all"),
    "&:hover": {
      transform: "scale(1.2)",
    },
  },

  footer: {
    paddingTop: theme.spacing(2),
    "& .link": {
      color: theme.palette.secondary.main,
      display: "flex",
      alignItems: "center",
    },
    "& .icon": {
      color: theme.palette.secondary.main,
      fontSize: "2.5rem",
    },
  },
}));
