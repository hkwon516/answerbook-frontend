import { Button } from "@material-ui/core";

const ButtonComponent = ({ children, ...props }) => {
  return (
    <Button style={{ fontWeight: 500 }} disableElevation {...props}>
      {children}
    </Button>
  );
};

export default ButtonComponent;
