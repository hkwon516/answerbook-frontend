import React from "react";

import { Link as MUILink } from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";

const LinkComponent = (props) => {
  const router = useRouter();
  return (
    <Link href={props.href} passHref locale={router.locale}>
      <MUILink color={"secondary"}>{props.children}</MUILink>
    </Link>
  );
};

export default LinkComponent;
