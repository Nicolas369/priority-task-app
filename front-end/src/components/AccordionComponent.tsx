import { Box, Typography } from "@mui/material";
import { appBorder, displayCenter } from "../theme/style";
import { useEffect, useRef, useState } from "react";

const makeStyles = (responsibility: any) => ({
  hoverMouseArea: { padding: "10px 0px" },
  accordionContainer: {
    width: "100%",
    ...displayCenter,
    flexDirection: "column",
    boxSizing: "border-box",
    ...appBorder(responsibility),
    transition: `borderTop 0.3s 0s, paddingBottom 0.3 0s`,
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
    transition: `transform 0.3s 0s, marginLeft 0.3s 0s`,
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
    transition: `borderWidth 0.3s 0s`,
    borderTop: "1px solid",
    borderColor: responsibility.border,
    width: "1em",
    borderTopLeftRadius: "6px",
  },
  headerBorderAfter: {
    transition: `borderWidth 0.3s 0s`,
    borderTop: " 1px solid",
    borderColor: responsibility.border,
    width: "1em",
    flexGrow: 2,
    borderTopRightRadius: "6px",
  },
  accordionChildren: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "6px",
    transition: `height 0.4s 0s`,
    width: "100%",
  },
});

// [ ] make component interface 
// [ ] move this to definition folder
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

  useEffect(() => {
    childrenRef.current && setContentHeight(childrenRef.current.offsetHeight);
  }, [childrenRef.current?.offsetHeight, isUse]);

  const handleMouseHover = (value: boolean) => {
    setInInput(value);
    onHover(value);
  };


  const HoverMouseArea = ({ children }: any) => {
    return (
      <Box sx={styles.hoverMouseArea}
        onMouseEnter={() => handleMouseHover(true)}
        onMouseLeave={() => handleMouseHover(false)}
      > { children } </Box>
    )
  }


  const AccordionContainer = ({ children }: any) => {
    return (
      <Box sx={{
          ...styles.accordionContainer,
          ...(inInput || isUse
            ? { borderTop: "none" }
            : { overflow: "hidden" }
          ),
          paddingBottom: `${!inInput && !isUse ? 3 : 0}em`,
        }}
      > { children } </Box>
    )
  }

  const AccordionLabel = () => {
    return (
      <Box sx={styles.labelContainer}>
        <Box sx={{ ...((inInput || isUse) && styles.headerBorderBefore) }}></Box>
        <Box sx={{ ...(inInput || isUse ? styles.transformTop : {}), ...styles.headerTitle, }} >
          <Typography> {label} </Typography>
        </Box>
        <Box sx={{ ...((inInput || isUse) && styles.headerBorderAfter) }} ></Box>
      </Box>
    )
  }

  const Accordion = ({children}: any) => {
    return (
      <Box sx={{ ...styles.accordionChildren,
        height: `${inInput || isUse ? contentHeight : 0}px`,
      }}
      > {children} </Box>
    )
  }

  return (
    <>
      {/* <Box sx={styles.hoverMouseArea}
        onMouseEnter={() => handleMouseHover(true)}
        onMouseLeave={() => handleMouseHover(false)}
      > */}
      <HoverMouseArea>
        {/* <Box sx={{
            ...styles.accordionContainer,
            ...(inInput || isUse
              ? { borderTop: "none" }
              : { overflow: "hidden" }),
            paddingBottom: `${!inInput && !isUse ? 3 : 0}em`,
          }}
        > */}
        <AccordionContainer>
          {/* <Box sx={styles.labelContainer}>
            <Box sx={{ ...((inInput || isUse) && styles.headerBorderBefore) }}></Box>

            <Box sx={{
                ...(inInput || isUse ? styles.transformTop : {}),
                ...styles.headerTitle,
              }} >
              <Typography> {label} </Typography>
            </Box>

            <Box sx={{ ...((inInput || isUse) && styles.headerBorderAfter) }} ></Box>
          </Box> */}

          <AccordionLabel />
{/* 
          <Box sx={{
              ...styles.accordionChildren,
              height: `${inInput || isUse ? contentHeight : 0}px`,
            }}
          > */}
          <Accordion>
            <Box ref={childrenRef}> {children} </Box>
          </Accordion>
          {/* </Box> */}
        </AccordionContainer>
        {/* </Box> */}
      </HoverMouseArea>
      {/* </Box> */}
    </>
  );
};
