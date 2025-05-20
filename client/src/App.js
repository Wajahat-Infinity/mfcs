import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { connect } from "react-redux";
import Routes from "./Routes";
import "./App.css";
import { useCheckSessions, useUpdateTheme } from "./Utilites";

export const ThemeContext = React.createContext([false, () => {}]);

function App({ auth, isSessionCheking }) {
  const [isThemeDark, setIsThemeDark, theme] = useUpdateTheme();
  const toggleTheme = () => {
    if (isThemeDark) setIsThemeDark(false);
    else setIsThemeDark(true);
  };
  useCheckSessions();

  return (
    <ThemeContext.Provider value={[isThemeDark, toggleTheme]}>
      <ThemeProvider theme={theme}>
        {isSessionCheking ? (
          <p>Loading...</p>
        ) : (
          <Routes auth={auth} isSessionCheking={isSessionCheking} />
        )}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
const mapStateToProps = (state) => {
  const { Auth } = state;
  return {
    isSessionCheking: Auth.isSessionCheking,
    auth: Auth.isUserSignedIn,
  };
};
export default connect(mapStateToProps)(App);
