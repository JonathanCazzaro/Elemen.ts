import Common from "../elements/Common";
import {
  ColumnsConfig,
  FailMessagesConfig,
  InputOptionsConfig,
  SourceOptionsConfig,
} from "./configObjects";
import {
  ButtonTypeEnum,
  FormMethodEnum,
  InputTypeEnum,
  ElementPositionEnum,
  MediaTypeEnum,
  ScopeEnum,
  RoleEnum,
} from "./enum";

export interface PageType {
  title?: string;
  description?: string;
  path: string;
  cssFiles?: string[];
  jsFiles?: string[];
  isActive: boolean;
  accessLevel: RoleEnum;
  setContent: (elements: GenericElement[]) => void;
  reach: (user?: UserType) => void;
  leave: () => void;
  denyAccess: () => void | null;
}

export interface UserType {
  isLogged: boolean;
  role: RoleEnum;
  token?: string;
  [key: string]: any;
  authenticate: (this: UserType) => Promise<boolean> | boolean | null;
  connect: (this: UserType) => Promise<boolean> | boolean | null;
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
  | TableColumnGroupType
  | TableRowType
  | TableCellType
  | TableCellHeaderType
  | OrderedListType
  | UnorderedListType
  | ListItemType
  | DescriptionListType
  | FormType
  | InputType
  | LabelType
  | ButtonType
  | DropdownType
  | TextAreaType
  | FieldsetType
  | AudioType
  | VideoType
  | ImageType
  | PictureType
  | FigureType;

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

export interface CaptionType extends CommonElementType {
  render: HTMLElement;
  textContent?: string;
  position: ElementPositionEnum;
  build: () => HTMLElement;
}

export interface FigureType extends CommonElementType {
  render: HTMLElement;
  caption?: CaptionType;
  build: () => HTMLElement;
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

// ---------------- Type definitions for Table elements ----------------
// ---------------------------------------------------------------------

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

export interface TableColumnGroupType extends CommonElementType {
  columnExtension?: number;
  columns?: ColumnsConfig[];
  build: () => HTMLTableColElement;
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

// ---------------- Type definitions for List elements ----------------
// --------------------------------------------------------------------

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

// ---------------- Type definitions for Form elements ----------------
// --------------------------------------------------------------------

export interface FormType extends CommonElementType {
  render: HTMLFormElement;
  action?: string;
  method?: FormMethodEnum;
  name?: string;
  noValidation: boolean;
  setChildren: (children: GenericElement[]) => void;
  onSubmit: (callback: (event: Event) => void) => void;
  build: () => HTMLFormElement;
}

export interface InputType extends CommonElementType {
  id: string;
  render: HTMLInputElement;
  type: InputTypeEnum;
  value?: string;
  name?: string;
  form?: FormType;
  autofocus: boolean;
  disabled: boolean;
  required: boolean;
  readonly: boolean;
  options?: InputOptionsConfig;
  validationFailMessages?: FailMessagesConfig;
  reveal: (timer?: number, callback?: () => void) => void;
  onFocus: (callback: () => void, blurCallback?: () => void) => void;
  build: () => HTMLInputElement;
}

export interface LabelType extends CommonElementType {
  render: HTMLLabelElement;
  textContent?: string;
  formElementId?: string;
  build: () => HTMLLabelElement;
}

export interface ButtonType extends CommonElementType {
  render: HTMLButtonElement;
  type: ButtonTypeEnum;
  form?: FormType;
  textContent?: string;
  name?: string;
  value?: string;
  disabled: boolean;
  build: () => HTMLLabelElement;
}

export interface DropdownType extends CommonElementType {
  id: string;
  render: HTMLSelectElement;
  form?: FormType;
  name?: string;
  autofocus: boolean;
  disabled: boolean;
  required: boolean;
  multiple: boolean;
  build: () => HTMLSelectElement;
}

export interface OptionType extends CommonElementType {
  render: HTMLOptionElement;
  textContent?: string;
  value?: string;
  disabled: boolean;
  selected: boolean;
  build: () => HTMLOptionElement;
}

export interface OptionsGroupType extends CommonElementType {
  render: HTMLOptGroupElement;
  label: string;
  disabled: boolean;
  build: () => HTMLOptGroupElement;
}

export interface TextAreaType extends CommonElementType {
  render: HTMLTextAreaElement;
  id: string;
  form?: FormType;
  name?: string;
  value?: string;
  autofocus: boolean;
  disabled: boolean;
  required: boolean;
  readonly: boolean;
  spellcheck: boolean;
  width?: number;
  height?: number;
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  validationFailMessages?: FailMessagesConfig;
  build: () => HTMLTextAreaElement;
}

export interface LegendType extends CommonElementType {
  render: HTMLLegendElement;
  textContent?: string;
  build: () => HTMLLegendElement;
}

export interface FieldsetType extends CommonElementType {
  render: HTMLFieldSetElement;
  name?: string;
  form?: FormType;
  legend?: LegendType;
  disabled: boolean;
  build: () => HTMLFieldSetElement;
}

// ---------------- Type definitions for Media elements ---------------
// --------------------------------------------------------------------

export interface SourceType extends CommonElementType {
  render: HTMLSourceElement;
  mediaType: MediaTypeEnum;
  options: SourceOptionsConfig;
  build: () => HTMLSourceElement;
}

export interface CommonMediaType extends CommonElementType {
  src?: string;
  children?: SourceType[];
  noSupportMessage?: string;
  autoplay: boolean;
  showControls: boolean;
  loop: boolean;
  muted: boolean;
}

export interface AudioType extends CommonMediaType {
  render: HTMLAudioElement;
  build: () => HTMLAudioElement;
}

export interface VideoType extends CommonMediaType {
  render: HTMLVideoElement;
  height?: number;
  width?: number;
  posterFrame?: string;
  build: () => HTMLVideoElement;
}

export interface ImageType extends CommonMediaType {
  render: HTMLImageElement;
  source: string;
  description: string;
  sourceSet?: string;
  mediaQueries?: string;
  setSource: (newSource: string) => void;
  build: () => HTMLImageElement;
}

export interface PictureType extends CommonElementType {
  render: HTMLPictureElement;
  build: () => HTMLPictureElement;
}
