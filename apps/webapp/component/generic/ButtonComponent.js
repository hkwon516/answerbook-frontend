import { Button } from "@material-ui/core";
import { useRouter } from "next/router";

const ButtonComponent = ({ children, ...props }) => {
  const router = useRouter();
  return (
    <Button style={{ fontWeight: router.locale === "en-US" ? 500 : "inherit" }} disableElevation {...props}>
      {children}
    </Button>
  );
};

export default ButtonComponent;
