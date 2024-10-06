import { Button } from "@mui/material";
import {
  ActionButtonInterface,
} from "../definitions/pages-definitions";
import { ColorResponsibility } from "../theme/style";
import { useColorByResponsibility } from "../store/selectors/themeSelector";

export const ActionButtonComponent = ({
  action,
  description,
  disabled,
  variant = "contained",
  responsibility = ColorResponsibility.DEFAULT
}: ActionButtonInterface) => {
  const btnAction = () => !disabled && action();
  const btnColor = useColorByResponsibility(responsibility);

  const btnStyle = {
    bgcolor: btnColor.dark,
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
