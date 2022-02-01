import { FailMessagesConfig, PatternConfig } from "./configObjects";
import {
  ButtonTypeEnum,
  FormMethodEnum,
  InputTypeEnum,
  ElementPositionEnum,
  MediaTypeEnum,
  ScopeEnum,
} from "./enum";
import {
  CaptionType,
  FormType,
  GenericElement,
  LabelType,
  LegendType,
  ListItemType,
  OptionsGroupType,
  OptionType,
  PageType,
  SourceType,
  TableCellHeaderType,
  TableCellType,
  TableColumnGroupType,
  TableRowType,
  TableSectionType,
} from "./types";

// --------------------- Structure Constructors ---------------------

export interface RouterConstructor {
  pages: PageType[];
  notFound: PageType;
}

export interface PageConstructor {
  title?: string;
  description?: string;
  path: string;
  cssFiles?: string[];
  jsFiles?: string[];
}

// --------------------- Element Constructors ---------------------

export interface CommonConstructor {
  id?: string;
  classes?: string;
  children?: GenericElement[];
}

// ------ Text Elements Constructors ------

export interface TextConstructor extends CommonConstructor {
  textContent?: string;
}

export interface TitleConstructor extends TextConstructor {
  level: number;
}

// ------ Generic Elements Constructors ------

export interface ContainerConstructor extends TextConstructor {}
export interface InsertConstructor extends TextConstructor {}

export interface CaptionConstructor extends TextConstructor {
  position: ElementPositionEnum;
}

export interface FigureConstructor extends CommonConstructor {
  caption?: CaptionType;
}

// ------ Structure Elements Constructors ------

export interface GenericStructureConstructor extends TextConstructor {}
export interface DetailsConstructor extends TextConstructor {
  summary?: string;
}

// ------ Navigation Elements Constructors ------

export interface LinkConstructor extends TextConstructor {
  target?: string;
}

// ------ Table Elements Constructors ------

export interface TableConstructor extends CommonConstructor {
  children?: TableRowType[] | TableColumnGroupType[] | TableSectionType[];
  caption?: string;
}

export interface TableSectionConstructor extends CommonConstructor {
  children?: TableRowType[];
}

export interface TableCellHeaderConstructor extends TextConstructor {
  rowExtension?: number;
  columnExtension?: number;
  scope?: ScopeEnum;
}

export interface TableRowConstructor extends CommonConstructor {
  children?: TableCellType[] | TableCellHeaderType[];
}

export interface TableCellConstructor extends TextConstructor {
  rowExtension?: number;
  columnExtension?: number;
}

export interface TableColGroupConstructor {
  id?: string;
  classes?: string;
  columnExtension?: number;
  columns?: TableColConfigConstructor[];
}

export interface TableColConfigConstructor {
  columnExtension?: number;
  classes?: string;
}

// ------ List Elements Constructors ------

export interface OrderedListConstructor extends CommonConstructor {
  children?: ListItemType[];
  reversed?: boolean;
  startFrom?: number;
}

export interface UnorderedListConstructor extends CommonConstructor {
  children?: ListItemType[];
}

export interface ListItemConstructor extends TextConstructor {}

// ------ Form Elements Constructors ------

export interface FormConstructor extends CommonConstructor {
  action?: string;
  method?: FormMethodEnum;
  name?: string;
  noValidation?: boolean;
}

export interface InputConstructor extends CommonConstructor {
  id: string;
  label?: LabelType;
  name?: string;
  form?: FormType;
  autofocus: boolean;
  disabled: boolean;
  required: boolean;
  readonly: boolean;
  type: InputTypeEnum;
  options?: InputOptionsConstructor;
  validationFailMessages?: FailMessagesConfig;
}

export interface LabelConstructor extends TextConstructor {
  position: ElementPositionEnum;
}

export type InputOptionsConstructor = {
  CHECKBOX_RADIO?: CHECKBOX_RADIO;
  DATE?: DATE;
  EMAIL?: EMAIL;
  PASSWORD?: PASSWORD;
  SEARCH?: SEARCH;
  TEL?: TEL;
  URL?: URL;
  TEXT?: TEXT;
  FILE?: FILE;
  NUMBER?: NUMBER;
  RANGE?: RANGE;
  TIME?: TIME;
};

export type CHECKBOX_RADIO = {
  /**
   * @param {boolean} [checked] - (optional) Boolean to specify whether the input should be set on checked or not.
   */
  checked?: boolean;
};

export type DATE = {
  /**
   * @param {string} [min] - (optional) Specify a minimum date (yyyy-MM-dd).
   */
  min?: string;
  /**
   * @param {string} [max] - (optional) Specify a maximum date (yyyy-MM-dd).
   */
  max?: string;
  /**
   * @param {number} [incrementStep] - (optional) Specify an increment basis. Each unity equals to one day. Default is 1.
   */
  incrementStep?: number;
};

export type EMAIL = {
  /**
   * @param {number} [minLength] - (optional) Minimum number of characters that should be entered to validate the input.
   */
  minLength?: number;
  /**
   * @param {number} [maxLength] - (optional) Maximum number of characters the field can take.
   */
  maxLength?: number;
  /**
   * @param {Object} [pattern] - (optional) Object to configure a data validation pattern based on a regex.
   */
  pattern?: PatternConfig;
  /**
   * @param {string} [placeholder] - (optional) Specify a placeholder if needed.
   */
  placeholder?: string;
};

export type PASSWORD = EMAIL;
export type SEARCH = EMAIL;
export type TEL = EMAIL;
export type URL = EMAIL;
export type TEXT = EMAIL;

export type FILE = {
  /**
   * @param {Array.string} [fileType] - (optional) An array of accepted file types (MIME types or file extensions).
   */
  fileType?: string[];
  /**
   * @param {number} [multiple] - (optional) If true, allows the user to select multiple files at once.
   */
  multiple?: boolean;
};

export type NUMBER = {
  /**
   * @param {number} [min] - (optional) Specify a minimum numeral value.
   */
  min?: number;
  /**
   * @param {number} [max] - (optional) Specify a maximum numeral value.
   */
  max?: number;
  /**
   * @param {number} [incrementStep] - (optional) Specify an increment basis.
   */
  incrementStep?: number;
  /**
   * @param {number} [placeholder] - (optional) Specify a placeholder if needed.
   */
  placeHolder?: number;
};

export type RANGE = {
  /**
   * @param {number} [min] - (optional) Specify a minimum numeral value.
   */
  min?: number;
  /**
   * @param {number} [max] - (optional) Specify a maximum numeral value.
   */
  max?: number;
  /**
   * @param {number} [incrementStep] - (optional) Specify an increment basis.
   */
  incrementStep?: number;
};

export type TIME = {
  /**
   * @param {string} [min] - (optional) Specify a minimum time date (hh:mm).
   */
  min?: string;
  /**
   * @param {string} [max] - (optional) Specify a maximum time (hh:mm).
   */
  max?: string;
  /**
   * @param {number} [incrementStep] - (optional) Specify an increment basis. Each unity equals to one second. Default is 60.
   */
  incrementStep?: number;
};

export interface ButtonConstructor extends TextConstructor {
  type: ButtonTypeEnum;
  form?: FormType;
  name?: string;
  value?: string;
  disabled?: boolean;
}

export interface DropdownConstructor extends CommonConstructor {
  children?: OptionsGroupType[] | OptionType[];
  form?: FormType;
  name?: string;
  label?: LabelType;
  disabled?: boolean;
  autofocus?: boolean;
  required?: boolean;
  multiple?: boolean;
}

export interface OptionConstructor extends TextConstructor {
  value?: string;
  disabled?: boolean;
  selected?: boolean;
}

export interface OptionsGroupConstructor extends CommonConstructor {
  children?: OptionType[];
  label: string;
  disabled?: boolean;
}

export interface TextAreaConstructor extends CommonConstructor {
  name?: string;
  value?: string;
  form?: FormType;
  label?: LabelType;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  width?: number;
  height?: number;
  disabled?: boolean;
  autofocus?: boolean;
  required?: boolean;
  readonly?: boolean;
  spellcheck?: boolean;
  validationFailMessages?: FailMessagesConfig;
}

export interface FieldsetConstructor extends CommonConstructor {
  name?: string;
  form?: FormType;
  legend?: LegendType;
  disabled?: boolean;
}

// ------ Media Elements Constructors ------

export type SourceOptionsConstructor = {
  AUDIO_VIDEO?: AUDIO_VIDEO;
  PICTURE?: PICTURE;
};
export type AUDIO_VIDEO = {
  /**
   * @param {string} src - Path to the resource.
   */
  src: string;
  /**
   * @param {string} [type] - (optional) MIME type of the resource.
   */
  type?: string;
};

export type PICTURE = {
  /**
   * @param {string} mediaQuery - Media query to select corresponding source (example: (max-width: 1024px)).
   */
  mediaQuery?: string;
  /**
   * @param {string} sourceSet - URL/path to the corresponding source.
   */
  sourceSet: string;
  /**
   * @param {string} [type] - (optional) MIME type of the resource.
   */
  type?: string;
};

export interface SourceConstructor extends CommonConstructor {
  mediaType: MediaTypeEnum;
  options: SourceOptionsConstructor;
}

export interface CommonMediaConstructor extends CommonConstructor {
  src?: string;
  children?: SourceType[];
  noSupportMessage?: string;
  autoplay?: boolean;
  showControls?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export interface AudioConstructor extends CommonMediaConstructor {}
export interface VideoConstructor extends CommonMediaConstructor {
  height?: number;
  width?: number;
  posterFrame?: string;
}

export interface ImageConstructor extends CommonConstructor {
  source: string;
  description: string;
  sourceSet?: string[];
  mediaQueries?: string[];
}
