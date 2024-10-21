import { CSSProperties } from "react";
import { GenericElementType } from "./global-definitions";
import { ResponsibilityColorType } from "./redux-definitions";
import { TaskObservable } from "../utils/observable";

export interface AccordionInterface {
  responsibility: ResponsibilityColorType;
  children: GenericElementType;
  label: GenericElementType | string;
  isUse: boolean;
  onHover: (isHover: boolean) => void;
}

export interface ContainerInterface {
    children: GenericElementType;
    responsibility?: ResponsibilityColorType;
    header?: string;
    sx?: CSSProperties;
}

export interface InputFieldInterface {
    inputId?: string;
    label: string;
    isTextArea?: boolean,
    colorResponsibility: ResponsibilityColorType;
    onChange: (value: string) => void;
    clearInputObservable?: TaskObservable
}