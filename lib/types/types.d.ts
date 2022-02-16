import {
  ColumnsConfig,
  FailMessagesConfig,
  InputOptionsConfig,
  OnClickConfig,
  OnFocusConfig,
  OnHoverConfig,
  SourceOptionsConfig,
} from "./configObjects";
import { InputOptionsConstructor, SourceOptionsConstructor, TableColConfigConstructor } from "./constructors";
import { ButtonTypeEnum, FormMethodEnum, InputTypeEnum, ElementPositionEnum, MediaTypeEnum, ScopeEnum, RoleEnum, DisplayModeEnum } from "./enum";

export interface PageType {
  title?: string;
  description?: string;
  path: string;
  cssFiles?: string[];
  jsFiles?: string[];
  isActive: boolean;
  accessLevel: RoleEnum;
  setContent(elements: GenericElement[]): void;
  reach(user?: UserType): void;
  leave(): void;
  onReach(callback: () => void): void;
  denyAccess(): void | null;
}

export interface UserType {
  isLoggedIn: boolean;
  role: RoleEnum;
  token?: string;
  [key: string]: any;
  authenticate(data?: Record<string, any>): Promise<void> | void;
  login(data?: Record<string, any>): Promise<void> | void;
  logout(): void;
}

export interface CommonElementType {
  serial: string;
  parentSerial?: string;
  setParentSerial(serial: string): void;
  children?: GenericElement[];
  setChildren(children: GenericElement[]): void;
  id?: string;
  setId(id: string): void;
  classes?: string[];
  setClasses(classes: string | string[]): void;
  textContent?: string;
  setTextContent(textContent: string): void;
  exclusionList?: string[];
  setExclusionList(list: string[]): void;
  render: HTMLElement;
  isMounted: boolean;
  displayMode: DisplayModeEnum;
  addClass(newClass: string): void;
  removeClass(oldClass: string): void;
  toggleClass(className: string): void;
  getElementBySerial(serial: string): HTMLElement | undefined;
  mount(): void;
  unmount(): void;
  onClick(configuration: OnClickConfig): void;
  onHover(configuration: OnHoverConfig): void;
}

export type HTMLElementModel =
  | HTMLElement
  | HTMLDivElement
  | HTMLSpanElement
  | HTMLAnchorElement
  | HTMLParagraphElement
  | HTMLHeadingElement
  | HTMLDetailsElement
  | HTMLTableElement
  | HTMLTableSectionElement
  | HTMLTableColElement
  | HTMLTableRowElement
  | HTMLTableCellElement
  | HTMLOListElement
  | HTMLUListElement
  | HTMLLIElement
  | HTMLDListElement
  | HTMLFormElement
  | HTMLInputElement
  | HTMLLabelElement
  | HTMLButtonElement
  | HTMLSelectElement
  | HTMLOptionElement
  | HTMLOptGroupElement
  | HTMLTextAreaElement
  | HTMLLegendElement
  | HTMLFieldSetElement
  | HTMLSourceElement
  | HTMLAudioElement
  | HTMLVideoElement
  | HTMLImageElement
  | HTMLPictureElement;

export type GenericElement =
  | CommonElementType
  | TextType
  | TitleType
  | ContainerType
  | LinkType
  | InsertType
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

// ---------------- Type definitions for Generic elements ----------------
// -----------------------------------------------------------------------

export interface ContainerType extends CommonElementType {
  render: HTMLDivElement;
}

export interface InsertType extends CommonElementType {
  render: HTMLSpanElement;
}

export interface CaptionType extends CommonElementType {
  position: ElementPositionEnum;
}

export interface FigureType extends CommonElementType {
  caption?: CaptionType;
}

// ---------------- Type definitions for Navigation elements ----------------
// --------------------------------------------------------------------------

export interface LinkType extends CommonElementType {
  target?: string;
  setTarget(target: string): void;
  render: HTMLAnchorElement;
}

// ---------------- Type definitions for Text elements -----------------
// ---------------------------------------------------------------------

export interface TextType extends CommonElementType {
  render: HTMLParagraphElement;
}

export interface TitleType extends CommonElementType {
  level: number;
  render: HTMLHeadingElement;
}

// ---------------- Type definitions for Structure elements -----------------
// --------------------------------------------------------------------------

export interface DetailsType extends CommonElementType {
  summary?: string;
  setSummary(summary: string): void;
  render: HTMLDetailsElement;
}

// ---------------- Type definitions for Table elements ----------------
// ---------------------------------------------------------------------

export interface TableType extends CommonElementType {
  children?: (TableRowType | TableColumnGroupType | TableSectionType)[];
  setChildren(children: (TableRowType | TableColumnGroupType | TableSectionType)[]): void;
  caption?: string;
  setCaption(caption: string): void;
  render: HTMLTableElement;
}

export interface TableSectionType extends CommonElementType {
  render: HTMLTableSectionElement;
}

export interface TableColumnGroupType extends CommonElementType {
  columnExtension?: number;
  setColumnExtension(extension: number): void;
  columns?: ColumnsConfig[];
  setColumns(columns: TableColConfigConstructor[]): void;
  render: HTMLTableColElement;
}

export interface TableRowType extends CommonElementType {
  render: HTMLTableRowElement;
}

export interface TableCellType extends CommonElementType {
  rowExtension?: number;
  setRowExtension(extension: number): void;
  columnExtension?: number;
  setColumnExtension(extension: number): void;
  render: HTMLTableCellElement;
}

export interface TableCellHeaderType extends TableCellType {
  scope?: ScopeEnum;
  setScope(scope: ScopeEnum): void;
}

// ---------------- Type definitions for List elements ----------------
// --------------------------------------------------------------------

export interface OrderedListType extends CommonElementType {
  reversed: boolean;
  setReversed(value: boolean): void;
  startFrom?: number;
  setStartFrom(value: number): void;
  render: HTMLOListElement;
}

export interface UnorderedListType extends CommonElementType {
  render: HTMLUListElement;
}

export interface ListItemType extends CommonElementType {
  render: HTMLLIElement;
}

export interface DescriptionListType extends CommonElementType {
  render: HTMLDListElement;
}

// ---------------- Type definitions for Form elements ----------------
// --------------------------------------------------------------------

export interface FormType extends CommonElementType {
  action?: string;
  setAction(action: string): void;
  method?: FormMethodEnum;
  setMethod(method: FormMethodEnum): void;
  name?: string;
  setName(name: string): void;
  noValidation: boolean;
  setNoValidation(value: boolean): void;
  onSubmit: (callback: (event: Event) => void) => void;
  render: HTMLFormElement;
}

export interface InputType extends CommonElementType {
  id: string;
  type: InputTypeEnum;
  setType(type: InputTypeEnum): void;
  value?: string;
  setValue(value: string): void;
  name?: string;
  setName(name: string): void;
  form?: FormType;
  setForm(form: FormType): void;
  autofocus: boolean;
  setAutofocus(value: boolean): void;
  disabled: boolean;
  setDisabled(value: boolean): void;
  required: boolean;
  setRequired(value: boolean): void;
  readonly: boolean;
  setReadonly(value: boolean): void;
  options?: InputOptionsConfig;
  setOptions(options: InputOptionsConstructor): void;
  validationFailMessages?: FailMessagesConfig;
  setValidationFailMessages(messages: FailMessagesConfig): void;
  reveal: (timer?: number, callback?: () => void) => void;
  focus: (configuration: OnFocusConfig) => void;
  onChange(callback: (event?: Event) => void): void;
  render: HTMLInputElement;
}

export interface LabelType extends CommonElementType {
  formElementId?: string;
  setFormElementId(id: string): void;
  render: HTMLLabelElement;
}

export interface ButtonType extends CommonElementType {
  type: ButtonTypeEnum;
  setType(type: ButtonTypeEnum): void;
  form?: FormType;
  setForm(form: FormType): void;
  textContent?: string;
  setTextContent(textContent: string): void;
  name?: string;
  setName(name: string): void;
  value?: string;
  setValue(value: string): void;
  disabled: boolean;
  setDisabled(value: boolean): void;
  render: HTMLButtonElement;
}

export interface DropdownType extends CommonElementType {
  id: string;
  children?: (OptionsGroupType | OptionType)[];
  setChildren(children: (OptionsGroupType | OptionType)[]): void;
  form?: FormType;
  setForm(form: FormType): void;
  name?: string;
  setName(name: string): void;
  value: string;
  setValue(value: string): void;
  autofocus: boolean;
  setAutofocus(value: boolean): void;
  disabled: boolean;
  setDisabled(value: boolean): void;
  required: boolean;
  setRequired(value: boolean): void;
  multiple: boolean;
  setMultiple(value: boolean): void;
  onChange(callback: (event?: Event) => void): void;
  render: HTMLSelectElement;
}

export interface OptionType extends CommonElementType {
  value?: string;
  setValue(value: string): void;
  disabled: boolean;
  setDisabled(value: boolean): void;
  selected: boolean;
  setSelected(value: boolean): void;
  render: HTMLOptionElement;
}

export interface OptionsGroupType extends CommonElementType {
  label: string;
  setLabel(label: string): void;
  disabled: boolean;
  setDisabled(value: boolean): void;
  render: HTMLOptGroupElement;
}

export interface TextAreaType extends CommonElementType {
  id: string;
  form?: FormType;
  setForm(form: FormType): void;
  name?: string;
  setName(name: string): void;
  value?: string;
  setValue(value: string): void;
  setAutofocus(value: boolean): void;
  disabled: boolean;
  setDisabled(value: boolean): void;
  required: boolean;
  setRequired(value: boolean): void;
  readonly: boolean;
  setReadonly(value: boolean): void;
  spellcheck: boolean;
  setSpellcheck(value: boolean): void;
  width?: number;
  setWidth(width: number): void;
  height?: number;
  setHeight(height: number): void;
  minLength?: number;
  setMinLength(minLength: number): void;
  maxLength?: number;
  setMaxLength(maxLength: number): void;
  placeholder?: string;
  setPlaceholder(placeholder: string): void;
  validationFailMessages?: FailMessagesConfig;
  setValidationFailMessages(messages: FailMessagesConfig): void;
  onChange(callback: (event?: Event) => void): void;
  render: HTMLTextAreaElement;
}

export interface LegendType extends CommonElementType {
  render: HTMLLegendElement;
}

export interface FieldsetType extends CommonElementType {
  form?: FormType;
  setForm(form: FormType): void;
  name?: string;
  setName(name: string): void;
  legend?: LegendType;
  setLegend(legend: LegendType): void;
  disabled: boolean;
  setDisabled(value: boolean): void;
  render: HTMLFieldSetElement;
}

// ---------------- Type definitions for Media elements ---------------
// --------------------------------------------------------------------

export interface SourceType extends CommonElementType {
  mediaType: MediaTypeEnum;
  setMediaType(mediaType: MediaTypeEnum): void;
  options: SourceOptionsConfig;
  setOptions(options: SourceOptionsConstructor): void;
  render: HTMLSourceElement;
}

export interface CommonMediaType extends CommonElementType {
  source?: string;
  setSource(source: string): void;
  children?: SourceType[];
  setChildren(children: SourceType[]): void;
  noSupportMessage?: string;
  setNoSupportMessage(message: string): void;
  autoplay: boolean;
  setAutoplay(value: boolean): void;
  showControls: boolean;
  setShowControls(value: boolean): void;
  loop: boolean;
  setLoop(value: boolean): void;
  muted: boolean;
  setMuted(value: boolean): void;
}

export interface AudioType extends CommonMediaType {
  render: HTMLAudioElement;
}

export interface VideoType extends CommonMediaType {
  height?: number;
  setHeight(height: number): void;
  width?: number;
  setWidth(width: number): void;
  posterFrame?: string;
  setPosterFrame(posterFrame: string): void;
  render: HTMLVideoElement;
}

export interface ImageType extends CommonMediaType {
  source: string;
  setSource: (source: string) => void;
  description: string;
  setDescription(description: string): void;
  sourceSet?: string;
  setSourceSet(set: string[]): void;
  mediaQueries?: string;
  setMediaQueries(queries: string[]): void;
  render: HTMLImageElement;
}

export interface PictureType extends CommonElementType {
  children: (SourceType | ImageType)[];
  setChildren(children: (SourceType | ImageType)[]): void;
  render: HTMLPictureElement;
}
