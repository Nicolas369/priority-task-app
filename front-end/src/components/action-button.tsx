import {
  ActionButtonInterface,
  Styles,
} from "../definitions/pages-definitions";

const styles: Styles = {
  main: {
    backgroundColor: "#ffffff",
    color: "blueviolet",
    border: "solid 1px #ffffff",
    margin: "5px",
    fontSize: ".75rem",
  },
  disabled: {
    backgroundColor: "#ffffff",
    opacity: 0.6,
  },
};

export const ActionButtonComponent = ({
  action,
  description,
  disabled,
}: ActionButtonInterface) => {
  const btnAction = () => !disabled && action();
  return (
    <button
      disabled={disabled}
      onClick={btnAction}
      style={disabled ? styles.disabled : styles.main}
    >
      {description}
    </button>
  );
};
