import React from "react";

import { Link as MUILink } from "@material-ui/core";
import Link from "next/link";

const LinkComponent = (props) => {
  return (
    <Link href={props.href} passHref>
      <MUILink color={"secondary"}>{props.children}</MUILink>
    </Link>
  );
};

export default LinkComponent;
