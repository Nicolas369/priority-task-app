import { Box, Typography } from "@mui/material";
import { appBorder, displayCenter } from "../theme/style";
import { useLayoutEffect, useRef, useState } from "react";

const makeStyles = (responsibility: any) => ({
  hoverMouseArea: { padding: "20px 0px" },
  accordionContainer: {
    width: "100%",
    ...displayCenter,
    flexDirection: "column",
    boxSizing: "border-box",
    ...appBorder(responsibility),
    transition: `borderTop 0.4s 0s, paddingBottom 0.4 0s, height 0.5s 0s`,
    position: "relative",
  },
  labelContainer: {
    position: "absolute",
    top: 0,
    zIndex: 50,
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  headerTitle: {
    transition: `transform 0.1s linear 0s, marginLeft 0.2s 0s`,
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    gap: "0.25em",
    width: "fit-content",
    backgroundColor: "transparent",
    padding: "5px",
    height: "2em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    border: "none",
    marginRight: "0.5em",
    marginLeft: "0.5em",
  },
  transformTop: {
    transform: "translate(-0em, -1.5em)",
    marginLeft: "0em",
  },
  headerBorderBefore: {
    transition: `borderWidth 0.4s 0s`,
    borderTop: "1px solid",
    borderColor: responsibility.border,
    width: "1em",
    borderTopLeftRadius: "6px",
  },
  headerBorderAfter: {
    transition: `borderWidth 0.4s 0s`,
    borderTop: " 1px solid",
    borderColor: responsibility.border,
    width: "1em",
    flexGrow: 2,
    borderTopRightRadius: "6px",
  },
  accordionEffect: {
    transition: "all 0.3s",
    overflow: "hidden",
    borderRadius: "6px",
    width: "100%",
  },
});

// [ ] make component interface
// [ ] move this to definition folder
// dev-note: old implementation in the 70% commit
export const AccordionComponent = ({
  responsibility,
  children,
  label,
  isUse,
  onHover,
}: any) => {
  const [inInput, setInInput] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const childrenRef = useRef<HTMLElement | null>(null);
  const styles = makeStyles(responsibility);

  useLayoutEffect(() => {
    childrenRef.current && setContentHeight(childrenRef.current.offsetHeight);
  }, [childrenRef.current?.offsetHeight, isUse, inInput]);

  const handleMouseHover = (value: boolean) => {
    setInInput(value);
    onHover(value);
  };

  return (
    <>
      <Box
        sx={{...styles.hoverMouseArea }}
        onMouseEnter={function () {
          handleMouseHover(true);
        }}
        onMouseLeave={() => handleMouseHover(false)}
      >
        <Box
          sx={{
            ...styles.accordionContainer,
            ...(inInput || isUse
              ? { borderTop: "none" }
              : { overflow: "hidden" }),
          }}
        >
          <Box sx={styles.labelContainer}>
            <Box
              sx={{ ...((inInput || isUse) && styles.headerBorderBefore) }}
            ></Box>
            <Box
              sx={{
                ...(inInput || isUse ? styles.transformTop : {}),
                ...styles.headerTitle,
              }}
            >
              <Typography> {label} </Typography>
            </Box>
            <Box
              sx={{ ...((inInput || isUse) && styles.headerBorderAfter) }}
            ></Box>
          </Box>
          <div
            style={{
              ...styles.accordionEffect,
              height: `${inInput || isUse ? contentHeight : 0}px`,
              margin: `${inInput || isUse ? 0 : 1.5}em 0em`
            }}
          >
            <Box ref={childrenRef}> {children} </Box>
          </div>
        </Box>
      </Box>
    </>
  );
};
