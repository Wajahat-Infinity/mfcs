import { makeStyles, IconButton } from "@material-ui/core";
import { GoogleIcon } from "../../units/SvgIcons";

const SocialLogin = () => {
  const classes = makeStyles((theme) => ({
    aAuthIcons: {
      paddingTop: theme.spacing(2),
      display: "flex",
      justifyContent: "center",

      "& .google": {
        backgroundColor: "#fff",
      },

      "&> .MuiIconButton-root": {
        padding: 0,
        overflow: "hidden",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        transition: theme.transitions.create(),
        "&:hover": {
          boxShadow: "0px 1px 5px 2px #7e95ff",
        },
      },
    },
  }))();

  const handleGoogleLogin = () => {
    window.open("http://localhost:8080/api/oAuth/google", "_parent");
  };

  return (
    <div className={classes.aAuthIcons}>
      <IconButton className="google" onClick={handleGoogleLogin}>
        <GoogleIcon />
      </IconButton>
    </div>
  );
};

export default SocialLogin;
