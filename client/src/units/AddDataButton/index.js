import { Container } from "@material-ui/core";
import Button from "../Button";

export const AddDataButton = ({
  className = "",
  onClick = () => {},
  children,
}) => {
  return (
    <Container
      style={{ display: "flex", justifyContent: "center" }}
      className={className}
    >
      <Button style={{ paddingLeft: 15, paddingRight: 15 }} onClick={onClick}>
        {children}
      </Button>
    </Container>
  );
};
export default AddDataButton;
