import { Container } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { oAuth } from "../Redux/Actions/Auth";
import HeaderTab from "../units/Tabs/HeaderTab";
import SidebarTab from "../units/Tabs/SidebarTab";

const Oauth = () => {
  const { accessToken } = useParams();
  const history = useHistory();
  const {
    Auth: { isOAuthLoading, isOAuthLoadingFailed, isUserSignedIn },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    if (isUserSignedIn) history.push("/dashboard");
    else dispatch(oAuth({ accessToken }));
  }, [accessToken, isUserSignedIn, history, dispatch]);
  return (
    <>
      <HeaderTab />
      <SidebarTab>
        <Container>
          {isOAuthLoading && <p>Loading...</p>}
          {isOAuthLoadingFailed && (
            <p>An Error occurred while Authorizing. Please try again.</p>
          )}
        </Container>
      </SidebarTab>
    </>
  );
};

export default Oauth;
