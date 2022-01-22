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
  mount: () => void;
  unmount: () => void;
}

export type GenericElement =
  | TextType
  | TitleType
  | ContainerType
  | LinkType
  | InsertType
  | GenericStructureType;

export interface ContainerType extends CommonElementType {
  render: HTMLDivElement;
  textContent?: string;
}

export interface InsertType extends CommonElementType {
  render: HTMLSpanElement;
  textContent?: string;
}

export interface LinkType extends CommonElementType {
  render: HTMLAnchorElement;
  textContent?: string;
  target?: string;
}

export interface TextType extends CommonElementType {
  render: HTMLParagraphElement;
  textContent?: string;
}

export interface TitleType extends CommonElementType {
  render: HTMLHeadingElement;
  textContent?: string;
}

export interface GenericStructureType extends CommonElementType {
  render: HTMLElement;
  textContent?: string;
}
