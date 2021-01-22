import React from "react";
import { useRouter } from "next/router";
import getTranslation from "../utils/locales";
import { useSnackbar } from "notistack";
import parse from "../utils/parse";
import getTheme from "./theme";

const withApp = (WrappedComponent) => {
  const ExtendedWithApp = (props) => {
    const snackbar = useSnackbar();

    const router = useRouter();
    const translate = getTranslation(router.locale);

    const showSuccess = (message) => {
      snackbar.enqueueSnackbar(message, { variant: "success" });
    };

    const showError = (message, options = {}) => {
      snackbar.enqueueSnackbar(message, { variant: "error", ...options });
    };
    return (
      <WrappedComponent theme={getTheme()} parse={parse} translate={translate} showSuccess={showSuccess} showError={showError} {...props} />
    );
  };
  return ExtendedWithApp;
};

export default withApp;
