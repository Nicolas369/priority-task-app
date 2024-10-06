import { TextField } from "@mui/material";

export const InputFieldComponent = ({
    inputId,
    label,
    onChange,
    isTextArea,
  colorResponsibility,
}: {
  inputId?: string;
  label: string;
  isTextArea?: boolean,
  colorResponsibility: any;
  onChange: (value: string) => void;
}) => {
  const styles = {
    // [ ] make this with theme class creator
    // [ ] make font smaller
    // [ ] make 3 types of global font sizes 
    main: {
      width: "100%",
      padding: "0px",
      marginBottom: "5%",
      boxSizing: "border-box",
      fontSize: ".5rem",
      "& label": {
        color: colorResponsibility.border,
      },
      "& label.Mui-focused": {
        color: colorResponsibility.border,
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: colorResponsibility.border,
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: colorResponsibility.border,
        },
        "&:hover fieldset": {
          borderColor: colorResponsibility.border,
        },
        "&.Mui-focused fieldset": {
          borderColor: colorResponsibility.border,
        },
        "& ::-webkit-scrollbar": {
           display: "none"
        },
      },
    },
  };

  const handleChange = (e: any) => {
    onChange(e.target.value);
  };

  return (
      <TextField
        id={inputId ? inputId : Math.random().toString()}
        sx={styles.main}
        label={label}
        variant="outlined"
        onChange={handleChange}
        multiline={isTextArea}
        minRows={isTextArea ? 3 : 1}
        maxRows={isTextArea ? 6 : 1}
      />
  );
};
