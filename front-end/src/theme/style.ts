import { CSSProperties } from "react";

export type ColorsType = "primary" | "secondary" | "tertiary";

export type ColorResponsibilityType =
  | "USER"
  | "ACTION"
  | "HIGHLIGHT"
  | "DEFAULT"
  | "BACKGROUND";

export enum ColorsVariants {
  primary = "primary",
  secondary = "secondary",
  tertiary = "tertiary",
}

export enum ColorResponsibility {
  USER = "USER",
  ACTION = "ACTION",
  HIGHLIGHT = "HIGHLIGHT",
  DEFAULT = "DEFAULT",
  BACKGROUND = "BACKGROUND",
}

export const MAX_APPLICATION_WIDTH: CSSProperties = { 
  maxWidth: "1280px",
  boxSizing: "border-box",
  overflow: "hidden"
}

export const displayCenter = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const appBorder = (color: any) => ({
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: color ? color.border: "transparent",
  borderRadius: "7px",
});

export const bgColor = (color: any) => ({
  backgroundColor: color.background,
});

export const shadow = {
  boxShadow: "rgba(0, 0, 0, 0.19) 0px 5px 10px, rgba(0, 0, 0, 0.23) 0px 3px 3px"
};

