import { TextField } from "@material-ui/core";

const InputComponent = ({ formik, ...props }) => {
  const hasError = formik.touched[props.name] && formik.errors[props.name] ? true : false;

  return (
    <TextField
      {...props}
      margin={hasError ? "dense" : "normal"}
      onChange={formik.handleChange}
      value={formik.values[props.name]}
      onBlur={formik.handleBlur}
      helperText={formik.touched[props.name] && formik.errors[props.name]}
      error={hasError}
    />
  );
};

export default InputComponent;
