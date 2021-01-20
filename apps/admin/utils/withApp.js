// This function takes a component...
import React from "react";
import { useRouter } from "next/router";
import getTranslation from "../utils/locales";
import { useSnackbar } from "notistack";

export default function withApp(WrappedComponent) {
  // ...and returns another component...
  return function (props) {
    const { enqueueSnackbar } = useSnackbar();

    const router = useRouter();
    const t = getTranslation(router.locale);

    const showSuccess = (message) => {
      enqueueSnackbar(message);
    };
    const showError = (message) => {
      enqueueSnackbar(message);
    };

    return (
      <WrappedComponent
        t={t}
        showSuccess={showSuccess}
        showError={showError}
        {...props}
      />
    );
  };
}
