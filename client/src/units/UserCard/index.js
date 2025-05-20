import { Typography } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import UserNameIcon from "../UserNameIcon";
import { dateFormatter } from "../../Utilites";
import Paper from "../Paper";
import { useStyles } from "./styles";

const UserCard = ({ name, email, joinedDate }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Paper className={classes.root}>
        <div className={classes.userIconContainer}>
          <UserNameIcon title={name} hasRightSpace />
        </div>
        <div className={classes.textSection}>
          <Typography className={classes.title}>
            <PersonIcon className={classes.icon} />
            {name}
          </Typography>
          <Typography className={classes.subTitle}>
            <EmailIcon className={classes.icon} />
            {email}
          </Typography>
          <Typography className={classes.subTitle}>
            <EventAvailableIcon className={classes.icon} />
            {dateFormatter(joinedDate)}
          </Typography>
        </div>
      </Paper>
    </div>
  );
};

export default UserCard;
