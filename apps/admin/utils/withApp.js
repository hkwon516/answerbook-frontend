// This function takes a component...
import React from "react";
import { useRouter } from "next/router";
import getTranslation from "../utils/locales";
import { useSnackbar } from "notistack";

export default function withApp(WrappedComponent) {
  return function (props) {
    const snackbar = useSnackbar();

    const router = useRouter();
    const t = getTranslation(router.locale);

    const showSuccess = (message) => {
      console.log(snackbar);
      if (snackbar) {
        snackbar.enqueueSnackbar(message);
      } else {
        console.log(message);
      }
    };
    const showError = (message) => {
      if (snackbar) {
        snackbar.enqueueSnackbar(message);
      } else {
        console.log(message);
      }
    };

    return <WrappedComponent t={t} showSuccess={showSuccess} showError={showError} {...props} />;
  };
}
