import { Button } from "@mui/material";
import {
  ActionButtonInterface,
} from "../definitions/pages-definitions";
import { ColorResponsibility, COLORS } from "../theme/style";

export const ActionButtonComponent = ({
  action,
  description,
  disabled,
  variant = "contained",
  responsibility = ColorResponsibility.DEFAULT
}: ActionButtonInterface) => {
  const btnAction = () => !disabled && action();

  const btnStyle = {
    bgcolor: COLORS[responsibility].dark,
    margin: "5px",
    fontSize: ".75rem",
  }

  return(
    <>
      <Button
        sx={btnStyle}
        size="small"
        onClick={btnAction}
        disabled={disabled}
        variant={variant}
      >{ description }</Button>  
    </>
  );
};
