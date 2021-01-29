import { Button } from "@material-ui/core";
import React from "react";
import LinkComponent from "../../component/generic/LinkComponent";

const Dashboard = (props) => {
  return (
    <div>
      <Button
        onClick={() => {
          props.onLogout();
        }}
      >
        {props.translate("userPages.confirm.linkSignout")}
      </Button>
    </div>
  );
};

export default Dashboard;
