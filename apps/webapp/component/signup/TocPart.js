import React from "react";
import { Link, TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import LinkComponent from "../generic/LinkComponent";
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
        <LinkComponent href="/signup/toc" color="secondary">
          {trimTocTextByHash(props.strPart)}
        </LinkComponent>
      );
    } else {
      return (
        <LinkComponent href="/signup/toc?tab=privacy"  color="secondary">
          {trimTocTextByHash(props.strPart)}
        </LinkComponent>
      );
    }
  } else {
    return (
      <Typography variant="caption" style={{ fontSize: "14px" }}>
       &nbsp;{trimTocTextByHash(props.strPart)}&nbsp;
      </Typography>
    );
  }
};

export default TocPart;
