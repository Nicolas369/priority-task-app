import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { displayCenter } from "../../../theme/style";
import { useState } from "react";
import { AccordionComponent } from "../../../components/AccordionComponent";
import { Box, Typography } from "@mui/material";

// [ ] move to constant file
const PRIORITIES = ["Non-Priority", "HIGH", "MEDIUM", "COMMON"];

export const PrioritySelector = ({
  responsibility,
  onChange,
}: {
  responsibility: any;
  onChange: (value: string) => void;
}) => {
  const [value, setValue] = useState("");
  const [displayPriority, setDisplayPriority] = useState(false);


  // [ ] make function constructor
  const styles = {
    formControl: {
      width: "100%",
      fontSize: ".5rem",
      boxSizing: "border-box",
    },
    radio: {
      color: responsibility.main,
      "&.Mui-checked": {
        color: responsibility.main,
      },
    },
    radioGroup: {
      width: "100%",
      height: "75px",
      ...displayCenter,
      boxSizing: "border-box",
      justifyContent: "space-around",
    },
    formControlLabel: {
      display: "flex",
      flexDirection: "column",
      margin: "0px",
      zIndex: 100,
    },
    colorLabelSelected: {
      color: responsibility.main,
    },
  };

  const handleRadioChange = (e: any) => {
    onChange(e.target.value);
    setValue(e.target.value);
  };

  const ComponentLabel = () => {
    // [ ] move to style object
    return (
      <FormLabel
        sx={{
          ...displayCenter,
          color: responsibility.border,
        }}
        id="demo-row-radio-buttons-group-label"
      >
        Task Priority
      </FormLabel>
    );
  };

  const DisplayTaskPriority = () => {
    // [ ] move to style object
    return (
      <Box
        sx={{
          height: "75px",
          width: "100%",
          ...displayCenter,
          backgroundColor: responsibility.background,
          color: "#ffffff",
        }}
      >
        <Typography
          sx={{
            width: "100%",
            fontSize: "1.5rem",
            fontFamily: "monospace",
            letterSpacing: "5px",
            fontWeight: 100,
            ...displayCenter,
          }}
        >
          {PRIORITIES[parseInt(value)]}
        </Typography>
      </Box>
    );
  };

  const HandleHover = (isHover: boolean) => {
    setDisplayPriority(() => !isHover && Boolean(value));
  };

  return (
    <>
      <AccordionComponent
        onHover={HandleHover}
        reRender={false}
        isUse={Boolean(value)}
        responsibility={responsibility}
        label={<ComponentLabel />}
      >
        {displayPriority ? (
          <DisplayTaskPriority />
        ) : (
          <FormControl sx={styles.formControl}>
            <RadioGroup
              onChange={handleRadioChange}
              row
              value={value}
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              sx={styles.radioGroup}
            >
              <FormControlLabel
                value="1"
                control={<Radio sx={styles.radio} />}
                sx={
                  value === "1"
                    ? {
                        ...styles.formControlLabel,
                        ...styles.colorLabelSelected,
                      }
                    : styles.formControlLabel
                }
                label="High"
              />
              <FormControlLabel
                value="2"
                control={<Radio sx={styles.radio} />}
                sx={
                  value === "2"
                    ? {
                        ...styles.formControlLabel,
                        ...styles.colorLabelSelected,
                      }
                    : styles.formControlLabel
                }
                label="Medium"
              />
              <FormControlLabel
                value="3"
                control={<Radio sx={styles.radio} />}
                sx={
                  value === "3"
                    ? {
                        ...styles.formControlLabel,
                        ...styles.colorLabelSelected,
                      }
                    : styles.formControlLabel
                }
                label="Common"
              />
            </RadioGroup>
          </FormControl>
        )}
      </AccordionComponent>
    </>
  );
};
