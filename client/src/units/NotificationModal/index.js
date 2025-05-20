import { fade, makeStyles, Typography } from "@material-ui/core";
import Button from "../Button";
import Modal from "../Modal";
import Paper from "../Paper";

const NotificationModal = ({
  children,
  isOpen,
  onClose = () => {},
  handleConfirm = () => {},
}) => {
  const classes = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(2, 1.5),
      minWidth: 200,
      width: "fit-content",
      maxWidth: 450,
      maxHeight: 180,
    },
    title: {
      color: theme.palette.primary.main,
      fontSize: theme.spacing(2.3),
      paddingBottom: theme.spacing(2),
    },
    error: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: fade(theme.palette.error.main, 0.7),
      },
    },

    buttons: {
      paddingTop: theme.spacing(1),
      display: "flex",
      justifyContent: "flex-end",
    },
  }))();

  return (
    <Modal open={isOpen}>
      <Paper className={classes.root}>
        <Typography className={classes.title}>{children}</Typography>
        <div className={classes.buttons}>
          <Button onClick={onClose}>Cancel</Button>
          &nbsp; &nbsp;
          <Button className={classes.error} onClick={handleConfirm}>
            Delete
          </Button>
        </div>
      </Paper>
    </Modal>
  );
};

export default NotificationModal;
