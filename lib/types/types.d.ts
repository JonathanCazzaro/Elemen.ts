import { InputOptionsConfig } from "./configObjects";
import { CommonConstructor } from "./constructors";
import { FormMethodEnum, InputTypeEnum, LabelPositionEnum, ScopeEnum } from "./enum";

export interface PageType {
  title?: string;
  description?: string;
  path: string;
  cssFiles?: string[];
  jsFiles?: string[];
  isActive: boolean;
  setContent: (elements: GenericElement[]) => void;
  reach: () => void;
  leave: () => void;
}

export interface CommonElementType {
  serial: string;
  parentSerial?: string;
  children?: GenericElement[];
  id?: string;
  classes?: string[];
  render: HTMLElement;
  addClass: (newClass: string) => void;
  removeClass: (oldClass: string) => void;
  toggleClass: (className: string) => void;
  getElementBySerial: (serial: string) => HTMLElement | undefined;
  build: (tag: string) => any;
  mount: () => void;
  unmount: () => void;
  onClick: (callback: () => void) => void;
}

export type GenericElement =
  | CommonElementType
  | TextType
  | TitleType
  | ContainerType
  | LinkType
  | InsertType
  | GenericStructureType
  | DetailsType
  | TableType
  | TableSectionType
  | TableRowType
  | TableCellType
  | TableCellHeaderType
  | OrderedListType
  | UnorderedListType
  | ListItemType
  | DescriptionListType
  | FormType
  | InputType;

export interface ContainerType extends CommonElementType {
  render: HTMLDivElement;
  textContent?: string;
  build: () => HTMLDivElement;
}

export interface InsertType extends CommonElementType {
  render: HTMLSpanElement;
  textContent?: string;
  build: () => HTMLSpanElement;
}

export interface LinkType extends CommonElementType {
  render: HTMLAnchorElement;
  textContent?: string;
  target?: string;
  build: () => HTMLAnchorElement;
}

export interface TextType extends CommonElementType {
  render: HTMLParagraphElement;
  textContent?: string;
  build: () => HTMLParagraphElement;
}

export interface TitleType extends CommonElementType {
  render: HTMLHeadingElement;
  textContent?: string;
  build: () => HTMLHeadingElement;
}

export interface GenericStructureType extends CommonElementType {
  render: HTMLElement;
  textContent?: string;
  build: () => HTMLElement;
}

export interface DetailsType extends CommonElementType {
  render: HTMLDetailsElement;
  textContent?: string;
  summary?: string;
  build: () => HTMLDetailsElement;
}

export interface TableType extends CommonElementType {
  render: HTMLDetailsElement;
  caption?: string;
  build: () => HTMLTableElement;
}

export interface TableSectionType extends CommonElementType {
  render: HTMLTableSectionElement;
  textContent?: string;
  build: () => HTMLTableSectionElement;
}

export interface TableRowType extends CommonElementType {
  render: HTMLTableRowElement;
  textContent?: string;
  build: () => HTMLTableRowElement;
}

export interface TableCellType extends CommonElementType {
  render: HTMLTableCellElement;
  textContent?: string;
  rowExtension?: number;
  columnExtension?: number;
  build: () => HTMLTableCellElement;
}

export interface TableCellHeaderType extends TableCellType {
  scope?: ScopeEnum;
}

export interface OrderedListType extends CommonElementType {
  render: HTMLOListElement;
  reversed: boolean;
  startFrom?: number;
  build: () => HTMLOListElement;
}

export interface UnorderedListType extends CommonElementType {
  render: HTMLUListElement;
  build: () => HTMLUListElement;
}

export interface ListItemType extends CommonElementType {
  render: HTMLLIElement;
  textContent?: string;
  build: () => HTMLLIElement;
}

export interface DescriptionListType extends CommonElementType {
  render: HTMLDListElement;
  build: () => HTMLDListElement;
}

export interface FormType extends CommonElementType {
  render: HTMLFormElement;
  action?: string;
  method?: FormMethodEnum;
  name?: string;
  build: () => HTMLFormElement;
}

export interface InputType extends CommonElementType {
  id: string;
  render: HTMLInputElement;
  type: InputTypeEnum;
  label?: LabelType;
  value?: string;
  name?: string;
  autofocus?: boolean;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  options?: InputOptionsConfig;
  build: () => HTMLInputElement;
}

export interface LabelType extends CommonElementType {
  render: HTMLLabelElement;
  textContent?: string;
  inputId?: string;
  position: LabelPositionEnum;
  build: () => HTMLLabelElement;
}