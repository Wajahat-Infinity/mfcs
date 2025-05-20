import { useState } from "react";
import SignInForm from "./index";
import Modal from "../../units/Modal";
import RequestPassResetForm from "./RequestPassResetForm";

const SignInModal = ({ openSignIn, handleSignInClose }) => {
  const [isSignInModal, setIsSignInModal] = useState(true);
  const handleForgetPassword = () => {
    setIsSignInModal(false);
  };
  const handleSignIn = () => {
    setIsSignInModal(true);
  };

  return (
    <Modal open={openSignIn} onClose={handleSignInClose}>
      {isSignInModal ? (
        <SignInForm
          handleForgetPassword={handleForgetPassword}
          handleSignInClose={handleSignInClose}
        />
      ) : (
        <RequestPassResetForm handleSignIn={handleSignIn} />
      )}
    </Modal>
  );
};

export default SignInModal;
