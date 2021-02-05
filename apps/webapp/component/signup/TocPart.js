import React from "react";
import { Link, TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const TocPart = (props) => {
  const trimTocTextByHash = (linkString) => {
    if (linkString.indexOf("#") > -1) {
      return linkString.slice(2);
    } else {
      return linkString;
    }
  };

  if (props.strPart.startsWith("#")) {
    if (props.strPart.startsWith("#1")) {
      return (
        <Link href="/signup/toc" style={{ paddingTop: "12px" }} color="secondary">
          {trimTocTextByHash(props.strPart)}
        </Link>
      );
    } else {
      return (
        <Link href="/signup/toc?tab=privacy" style={{ paddingTop: "12px" }} color="secondary">
          {trimTocTextByHash(props.strPart)}
        </Link>
      );
    }
  } else {
    return (
      <Typography variant="caption" style={{ fontSize: "14px", paddingTop: "10px" }}>
        &nbsp;{trimTocTextByHash(props.strPart)}&nbsp;
      </Typography>
    );
  }
};

export default TocPart;
