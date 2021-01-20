import React from "react";
import { useRouter } from "next/router";
import getTranslation from "../utils/locales";
import { useSnackbar } from "notistack";

const withApp = (WrappedComponent) => {
  const ExtendedWithApp = (props) => {
    const snackbar = useSnackbar();

    const router = useRouter();
    const t = getTranslation(router.locale);

    const showSuccess = (message) => {
      snackbar.enqueueSnackbar(message);
    };

    const showError = (message) => {
      snackbar.enqueueSnackbar(message);
    };

    return <WrappedComponent t={t} showSuccess={showSuccess} showError={showError} {...props} />;
  };
  return ExtendedWithApp;
};

export default withApp;
