import { TextField } from "@material-ui/core";

const InputComponent = ({ formik, ...props }) => {
  const hasError = formik.touched[props.name] && formik.errors[props.name] ? true : false;
  let extendedProps = { ...props };
  if (!props.margin) {
    extendedProps = { ...extendedProps, margin: hasError ? "dense" : "normal" };
  }

  if (!props.variant) {
    extendedProps = { ...extendedProps, variant: "filled" };
  }
  return (
    <TextField
      {...extendedProps}
      onChange={formik.handleChange}
      value={formik.values[props.name]}
      onBlur={formik.handleBlur}
      helperText={formik.touched[props.name] && formik.errors[props.name]}
      error={hasError}
    />
  );
};

export default InputComponent;
