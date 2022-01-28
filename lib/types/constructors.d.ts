import { FailMessagesConfig, PatternConfig } from "./configObjects";
import {
  FormMethodEnum,
  InputPatternsEnum,
  InputTypeEnum,
  LabelPositionEnum,
  ScopeEnum,
} from "./enum";
import { GenericElement, LabelType, PageType } from "./types";

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
  caption?: string;
}

export interface TableCellHeaderConstructor extends TextConstructor {
  rowExtension?: number;
  columnExtension?: number;
  scope?: ScopeEnum;
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
  reversed?: boolean;
  startFrom?: number;
}

export interface ListItemConstructor extends TextConstructor {}

// ------ Form Elements Constructors ------

export interface FormConstructor extends CommonConstructor {
  action?: string;
  method?: FormMethodEnum;
  name?: string;
}

export interface InputConstructor extends CommonConstructor {
  id: string;
  label?: LabelType;
  name?: string;
  autofocus?: boolean;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  type: InputTypeEnum;
  options?: InputOptionsConstructor;
  validationFailMessages?: FailMessagesConfig;
}

export interface LabelConstructor extends TextConstructor {
  position: LabelPositionEnum;
}

export type InputOptionsConstructor = {
  CHECKBOX_RADIO?: CHECKBOX_RADIO;
  DATE?: DATE;
  EMAIL_PASSWORD_SEARCH_TEL_URL_TEXT?: EMAIL_PASSWORD_SEARCH_TEL_URL_TEXT;
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

export type EMAIL_PASSWORD_SEARCH_TEL_URL_TEXT = {
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
