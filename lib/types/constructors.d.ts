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
  failMessages?: FailMessagesConfig;
}

export interface LabelConstructor extends TextConstructor {
  position: LabelPositionEnum;
}

export type InputOptionsConstructor = {
  CHECKBOX?: CHECKBOX;
  DATE?: DATE;
  EMAIL?: EMAIL;
};

export type CHECKBOX = {
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
