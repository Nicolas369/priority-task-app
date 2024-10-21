import { CSSProperties, ReactElement, ReactNode } from "react";

export type Styles = {
  [key: string]: CSSProperties;
};

export type GenericElementType = ReactNode | ReactElement;
