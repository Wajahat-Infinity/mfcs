import {
  Backdrop,
  Fade,
  Modal as MuiModal,
  makeStyles,
} from "@material-ui/core";

export const Modal = (props) => {
  const classes = useStyles();

  return (
    <MuiModal
      className={classes.modal}
      {...props}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>{props.children}</Fade>
    </MuiModal>
  );
};

export default Modal;

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      width: "94%",
      margin: "0 auto",
    },
  },
}));
