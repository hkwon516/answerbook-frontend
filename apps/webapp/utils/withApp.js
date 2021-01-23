// This function takes a component...
import React from "react";
import { useRouter } from "next/router";
import getTranslation from "../utils/locales";

export default function withApp(WrappedComponent) {
  // ...and returns another component...
  return function (props) {
    const router = useRouter();
    const translate = getTranslation(router.locale);

    return <WrappedComponent translate={translate} {...props} />;
  };
}
