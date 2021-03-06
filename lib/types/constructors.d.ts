import { FailMessagesConfig, ModifyDataConfig, PatternConfig, RequestDataConfig } from "./configObjects";
import { ButtonTypeEnum, FormMethodEnum, InputTypeEnum, ElementPositionEnum, MediaTypeEnum, ScopeEnum, RoleEnum, DisplayModeEnum } from "./enum";
import {
  CaptionType,
  FormType,
  GenericElement,
  ImageType,
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
  UserType,
} from "./types";

// --------------------- Structure Constructors ---------------------

export interface ApplicationConstructor {
  /**
   * @param {Array.PageType} pages - The pages of your application. Use the Page API to make them.
   */
  pages: PageType[];
  /**
   * @param {PageType} notFound - A special 404 page that will be displayed if the path has no match. Use again Page API.
   */
  notFound: PageType;
  /**
   * @param {UserType} [user] - (optional) A user instance for handling roles. Recommended if the application has private pages.
   */
  user?: UserType;
  /**
   * @param {string} [rootElementId] - (optional) Specify an ID if you need your app to be mounted in a root element other than body. Required when using the Modal template element.
   */
  rootElementId?: string;
}

export interface PageConstructor {
  /**
   * @param {string} [title] - (optional) The title of the page (should be 60-65 characters max). Leave it blank if you want to keep the title that has been defined in the HTML template.
   */
  title?: string;
  /**
   * @param {string} [description] - (optional) Description of the page for SEO (should be 155 characters max).
   */
  description?: string;
  /**
   * @param {string} path - The path used to get to the page (example : /contact or just contact).
   */
  path: string;
  /**
   * @param {Array.string} [cssFiles] - (optional) An array of relative paths to CSS files to be loaded dynamically.
   */
  cssFiles?: string[];
  /**
   * @param {Array.string} [jsFiles] - (optional) An array of relative paths to JS files to be loaded dynamically.
   */
  jsFiles?: string[];
  /**
   * @param {RoleEnum} [accessLevel] - (optional) Define the access level of the page using enum RoleEnum. If not set, default will be VISITOR.
   */
  accessLevel?: RoleEnum;
  /**
   * @param {function} [denyAccess] - (optional) Behaviour of the application when the access to the page is not granted.
   */
  denyAccess?: () => void;
}

export interface UserConstructor {
  /**
   * @param {object} [properties] - (optional) Any key/value couple needed to define the user.
   */
  properties?: {
    [key: string]: any;
  };
  /**
   * @param {function} [authenticate] - (optional) Custom method to handle authentication (with tokens for example).
   */
  authenticate?: (data?: { [key: string]: any }) => void;
  /**
   * @param {function} [login] - (optional) Custom method to handle connection.
   */
  login?: (data?: { [key: string]: any }) => void;
  /**
   * @param {function} [logout] - (optional) Custom method to handle disconnection.
   */
  logout?: () => void;
}

export interface DataManagerConstructor {
  /**
   * @param {function} [login] - (optional) Treatment to get the user logged in.
   */
  login?: (credentials: Record<string, string>) => void;
  /**
   * @param {function} [verifyToken] - (optional) Treatment to authenticate the user.
   */
  verifyToken?: () => void;
  /**
   * @param {function} [requestData] - (optional) Treatment to get data from an API.
   */
  requestData?: (config: RequestDataConfig) => void;
  /**
   * @param {function} [createRecord] - (optional) Treatment to create a new record in a distant API.
   */
  createRecord?: (config: ModifyDataConfig) => any;
  /**
   * @param {function} [updateRecord] - (optional) Treatment to update a record from a distant API.
   */
  updateRecord?: (config: ModifyDataConfig) => any;
  /**
   * @param {function} [deleteRecord] - (optional) Treatment to delete a record from a distant API.
   */
  deleteRecord?: (config: ModifyDataConfig) => any;
  /**
   * @param {function} [makeRelation] - (optional) Treatment to associate one record to others.
   */
  makeRelation?: (config: ModifyDataConfig) => any;
  /**
   * @param {function} [makeRelation] - (optional) Treatment to remove an association between records.
   */
  removeRelation?: (config: ModifyDataConfig) => any;
}

// --------------------- Element Constructors ---------------------

export interface CommonConstructor {
  /**
   * @param {string} [id] - (optional)
   */
  id?: string;
  /**
   * @param {string|number} [data_id] - (optional) The identifier of the record if it comes from a database.
   */
  data_id?: string | number;
  /**
   * @param {string} [classes] - (optional) A space is needed between each class.
   */
  classes?: string;
  /**
   * @param {Array.GenericElement} [children] - (optional) An array containing the children elements if any.
   */
  children?: GenericElement[];
  /**
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   */
  exclusionList?: string[];
  /**
   * @param {string} [textContent] - (optional) Text to be displayed inside the element.
   */
  textContent?: string;
  /**
   * @param {DisplayModeEnum} [displayMode] - (optional) Specifies if the component will be shared among pages (like a navbar) or should be loaded dynamically. Will produce effect only when using dynamic CSS/scripts imports within the Page API. Use enum DisplayModeEnum. Default is DYNAMIC.
   */
  displayMode?: DisplayModeEnum;
  /**
   * @param {function} [onClick] - (optional) Sets a function to describe the actions on click.
   */
  onClick?: (event?: Event) => any;
  /**
   * @param {function} [onClickOutside] - (optional) Sets a function to describe the actions on click outside the element (and its children).
   */
  onClickOutside?: (event?: Event) => any;
}

// ------ Text Elements Constructors ------

export interface TitleConstructor extends CommonConstructor {
  /**
   * @param {number} level - Level of the title.
   */
  level: number;
}

// ------ Generic Elements Constructors ------

export interface CaptionConstructor extends CommonConstructor {
  /**
   * @param {ElementPositionEnum} position - Defines whether the caption should be placed before or after the related element. Use enum ElementPositionEnum.
   */
  position: ElementPositionEnum;
}

export interface FigureConstructor extends CommonConstructor {
  /**
   * @param {CaptionType} [caption] - (optional) Caption for the content of the element.
   */
  caption?: CaptionType;
}

export interface ModalConstructor {
  /**
   * @param {string} id
   */
  id: string;
  /**
   * @param {Array.GenericElement} content - An array containing the elements of the modal.
   */
  content: GenericElement[];
  /**
   * @param {function} [onClickOustide] - (optional) Set the actions that should be performed on click outside the modal.
   */
  onClickOustide?: (event: Event) => void;
  /**
   * @param {string|Array.string} [additionnalCSSRules] - (optional) Custom CSS rules to be applied while the modal is mounted.
   */
  additionnalCSSRules?: string | string[];
}

// ------ Structure Elements Constructors ------

export interface DetailsConstructor extends CommonConstructor {
  /**
   * @param {string} [summary] - (optional) Caption intented to give information about the hidden content.
   */
  summary?: string;
}

// ------ Navigation Elements Constructors ------

export interface LinkConstructor extends CommonConstructor {
  /**
   * @param {string} [target] - (optional) Target of the link (url, local path, etc...).
   */
  target?: string;
}

// ------ Table Elements Constructors ------

export interface TableConstructor extends CommonConstructor {
  /**
   * @param {Array.(TableRowType|TableColumnGroupType|TableSectionType)} [children] - (optional) An array containing the children elements if any.
   */
  children?: (TableRowType | TableColumnGroupType | TableSectionType)[];
  /**
   * @param {string} [caption] - (optional) Caption placed at the top of the table.
   */
  caption?: string;
}

export interface TableSectionConstructor extends CommonConstructor {
  /**
   * @param {Array.TableRowType} [children] - (optional) An array containing the children elements if any.
   */
  children?: TableRowType[];
}

export interface TableCellHeaderConstructor extends CommonConstructor {
  /**
   * @param {number} [rowExtension] - (optional) Defines the quantity of rows upon which the cell is extending. Must be strictly superior to 0.
   */
  rowExtension?: number;
  /**
   * @param {number} [columnExtension] - (optional) Defines the quantity of columns upon which the cell is extending. Must be strictly superior to 0.
   */
  columnExtension?: number;
  /**
   * @param {ScopeEnum} [scope] - (optional) Specifies to which cells is the header related to.
   */
  scope?: ScopeEnum;
}

export interface TableRowConstructor extends CommonConstructor {
  /**
   * @param {Array.(TableRowType|TableCellHeaderType)} [children] - (optional) An array containing the children elements if any.
   */
  children?: (TableCellType | TableCellHeaderType)[];
}

export interface TableCellConstructor extends CommonConstructor {
  /**
   * @param {number} [rowExtension] - (optional) Defines the quantity of rows upon which the cell is extending. Must be strictly superior to 0.
   */
  rowExtension?: number;
  /**
   * @param {number} [columnExtension] - (optional) Defines the quantity of columns upon which the cell is extending. Must be strictly superior to 0.
   */
  columnExtension?: number;
}

export interface TableColGroupConstructor {
  /**
   * @param {string} [id] - (optional)
   */
  id?: string;
  /**
   * @param {string|number} [data_id] - (optional) The identifier of the record if it comes from a database.
   */
  data_id?: string | number;
  /**
   * @param {string} [classes] - (optional) A space is needed between each class.
   */
  classes?: string;
  /**
   * @param {DisplayModeEnum} [displayMode] - (optional) Specifies if the component will be shared among pages (like a navbar) or should be loaded dynamically. Will produce effect only when using dynamic CSS/scripts imports within the Page API. Use enum DisplayModeEnum. Default is DYNAMIC.
   */
  displayMode?: DisplayModeEnum;
  /**
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   */
  exclusionList?: string[];
  /**
   * @param {number} [columnExtension] - (optional) Defines the quantity of columns upon which the element is extending. Must be strictly superior to 0.
   */
  columnExtension?: number;
  /**
   * @param {Array.ColumnsConfig} [columns] - (optional) Details of the columns (columnExtension, classes). If columns are provided, columnExtension should not be set for parent element.
   */
  columns?: TableColConfigConstructor[];
  /**
   * @param {function} [onClick] - (optional) Sets a function to describe the actions on click.
   */
  onClick?: (event?: Event) => any;
  /**
   * @param {function} [onClickOutside] - (optional) Sets a function to describe the actions on click outside the element (and its children).
   */
  onClickOutside?: (event?: Event) => any;
}

export interface TableColConfigConstructor {
  /**
   * @param {number} [columnExtension] - (optional) Defines the quantity of columns upon which the element is extending. Must be strictly superior to 0.
   */
  columnExtension?: number;
  /**
   * @param {string} [classes] - (optional) A space is needed between each class.
   */
  classes?: string;
}

// ------ List Elements Constructors ------

export interface OrderedListConstructor extends CommonConstructor {
  /**
   * @param {Array.ListItemType} [children] - (optional) An array containing the children elements if any.
   */
  children?: ListItemType[];
  /**
   * @param {boolean} [reversed] - (optional) If true, items will be listed in descending order.
   */
  reversed?: boolean;
  /**
   * @param {number} [startFrom] - (optional) The number the list should start from.
   */
  startFrom?: number;
}

export interface UnorderedListConstructor extends CommonConstructor {
  /**
   * @param {Array.ListItemType} [children] - (optional) An array containing the children elements if any.
   */
  children?: ListItemType[];
}

// ------ Form Elements Constructors ------

export interface FormConstructor {
  /**
   * @param {string} [id] - (optional)
   */
  id?: string;
  /**
   * @param {string|number} [data_id] - (optional) The identifier of the record if it comes from a database.
   */
  data_id?: string | number;
  /**
   * @param {string} [classes] - (optional) A space is needed between each class.
   */
  classes?: string;
  /**
   * @param {DisplayModeEnum} [displayMode] - (optional) Specifies if the component will be shared among pages (like a navbar) or should be loaded dynamically. Will produce effect only when using dynamic CSS/scripts imports within the Page API. Use enum DisplayModeEnum. Default is DYNAMIC.
   */
  displayMode?: DisplayModeEnum;
  /**
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   */
  exclusionList?: string[];
  /**
   * @param {string} [action] - (optional) Target URL where the data should be sent on submit.
   */
  action?: string;
  /**
   * @param {FormMethodEnum} [method] - (optional) HTTP method used to send the form. Use enum type FormMethodEnum to specify value.
   */
  method?: FormMethodEnum;
  /**
   * @param {string} [name] - (optional) Name of the form (must be unique in the document).
   */
  name?: string;
  /**
   * @param {boolean} [noValidation] - (optional) If set to true, the data will be not be checked for validation before submitting.
   */
  noValidation?: boolean;
  /**
   * @param {function} [onClick] - (optional) Sets a function to describe the actions on click.
   */
  onClick?: (event?: Event) => any;
  /**
   * @param {function} [onClickOutside] - (optional) Sets a function to describe the actions on click outside the element (and its children).
   */
  onClickOutside?: (event?: Event) => any;
}

export interface InputConstructor extends CommonConstructor {
  /**
   * @param {string} id Required.
   */
  id: string;
  /**
   * @param {string} [name] - (optional) Name of the input (identification for data submitting).
   */
  name?: string;
  /**
   * @param {FormType} [form] - (optional) The form element instance related to the input. Required if the input is outside the form element.
   */
  form?: FormType;
  /**
   * @param {string} [value] - (optional) Value of the input if it needs to be initialized.
   */
  value?: string;
  /**
   * @param {boolean} [autofocus] - (optional) Boolean to specify whether the input should be set on autofocus or not.
   */
  autofocus?: boolean;
  /**
   * @param {boolean} [disabled] - (optional) Boolean to specify whether the input should be set on disabled or not.
   */
  disabled?: boolean;
  /**
   * @param {boolean} [required] - (optional) Boolean to specify whether the input should be set on required or not.
   */
  required?: boolean;
  /**
   * @param {boolean} [readonly] - (optional) Boolean to specify whether the input should be set on readonly or not.
   */
  readonly?: boolean;
  /**
   * @param {InputTypeEnum} type - Set the type of input using enum InputTypeEnum.
   */
  type: InputTypeEnum;
  /**
   * @param {Object} [options] - (optional) Specific options for the related input type.
   */
  options?: InputOptionsConstructor;
  /**
   * @param {Object} [validationFailMessages] - (optional) Customizable messages to display when the data validation did not pass.
   */
  validationFailMessages?: FailMessagesConfig;
}

export interface LabelConstructor extends CommonConstructor {
  /**
   * @param {string} [formElementId] - (optional) The ID of the related element. Required if the element is not a direct child of the label.
   */
  formElementId?: string;
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

export interface ButtonConstructor extends CommonConstructor {
  /**
   * @param {ButtonTypeEnum} type - Role of the button, use enum type ButtonTypeEnum to define it.
   */
  type: ButtonTypeEnum;
  /**
   * @param {FormType} [form] - (optional) The form element instance related to the button, required with a submit or reset type button if it is outside the form.
   */
  form?: FormType;
  /**
   * @param {string} [name] - (optional) Name indicator sent with the form as part of the data. Works as a couple with the value attribute.
   */
  name?: string;
  /**
   * @param {string} [value] - (optional) Additional data sent with the form. Useless if name not defined.
   */
  value?: string;
  /**
   * @param {boolean} [disabled] - (optional) Boolean to specify whether the button should be disabled or not.
   */
  disabled?: boolean;
}

export interface DropdownConstructor extends CommonConstructor {
  /**
   * @param {Array.(OptionsGroupType|OptionType)} [children] - (optional) An array containing the children elements if any (Options Group or Option elements).
   */
  children?: (OptionsGroupType | OptionType)[];
  /**
   * @param {FormType} [form] - (optional) The form element instance related to the dropdown, required if placed outside.
   */
  form?: FormType;
  /**
   * @param {string} [name] - (optional) Name indicator sent with the form as part of the data. Works as a couple with the value attribute.
   */
  name?: string;
  /**
   * @param {boolean} [disabled] - (optional) Boolean to specify whether the dropdown should be disabled or not.
   */
  disabled?: boolean;
  /**
   * @param {boolean} [autofocus] - (optional) Boolean to specify whether the dropdown should be set on autofocus or not.
   */
  autofocus?: boolean;
  /**
   * @param {boolean} [required] - (optional) Boolean to specify whether the dropdown should be set on required or not.
   */
  required?: boolean;
  /**
   * @param {boolean} [multiple] - (optional) Boolean to specify whether the dropdown should be set on multiple or not.
   */
  multiple?: boolean;
}

export interface OptionConstructor extends CommonConstructor {
  /**
   * @param {string} [value] - (optional) Value which will be sent when submitting.
   */
  value?: string;
  /**
   * @param {boolean} [disabled] - (optional) Boolean to specify whether the element should be disabled or not.
   */
  disabled?: boolean;
  /**
   * @param {boolean} [selected] - (optional) Boolean to specify whether the element should be selected or not.
   */
  selected?: boolean;
}

export interface OptionsGroupConstructor extends CommonConstructor {
  /**
   * @param {Array.OptionType} [children] - (optional) An array containing the children elements if any.
   */
  children?: OptionType[];
  /**
   * @param {string} label - Name of the options group, displayed in the browser.
   */
  label: string;
  /**
   * @param {boolean} [disabled] - (optional) Boolean to specify whether the element should be disabled or not.
   */
  disabled?: boolean;
}

export interface TextAreaConstructor extends CommonConstructor {
  /**
   * @param {string} [name] - (optional) Name of the text area (identification for data submitting).
   */
  name?: string;
  /**
   * @param {string} [value] - (optional) Value of the field.
   */
  value?: string;
  /**
   * @param {FormType} [form] - (optional) The form element instance related to the text area. Required if the element is outside the form.
   */
  form?: FormType;
  /**
   * @param {string} [placeholder] - (optional) Default text to be displayed before the user start typing.
   */
  placeholder?: string;
  /**
   * @param {number} [minLength] - (optional) The minimum number of characters the user should enter.
   */
  minLength?: number;
  /**
   * @param {number} [maxLength] - (optional) The maximum number of characters the user should enter.
   */
  maxLength?: number;
  /**
   * @param {number} [width] - (optional) The width of the text area, in average character width. Default is 20.
   */
  width?: number;
  /**
   * @param {number} [height] - (optional) The height of the text area. Each unit equals to a line of text. Default is 2.
   */
  height?: number;
  /**
   * @param {boolean} [disabled] - (optional) Boolean to specify whether the text area should be set on disabled or not.
   */
  disabled?: boolean;
  /**
   * @param {boolean} [autofocus] - (optional) Boolean to specify whether the text area should be set on autofocus or not.
   */
  autofocus?: boolean;
  /**
   * @param {boolean} [required] - (optional) Boolean to specify whether the text area should be set on required or not.
   */
  required?: boolean;
  /**
   * @param {boolean} [readonly] - (optional) Boolean to specify whether the text area should be set on readonly or not.
   */
  readonly?: boolean;
  /**
   * @param {boolean} [spellcheck] - (optional) Boolean to specify whether the text area should be spell checked or not.
   */
  spellcheck?: boolean;
  /**
   * @param {Object} [validationFailMessages] - (optional) Customizable messages to display when the data validation did not pass.
   */
  validationFailMessages?: FailMessagesConfig;
}

export interface FieldsetConstructor extends CommonConstructor {
  /**
   * @param {string} [name] - (optional) Name of the Fieldset (identification for data submitting).
   */
  name?: string;
  /**
   * @param {FormType} [form] - (optional) The form element instance related to the fieldset. Required if the fieldset is outside the form element.
   */
  form?: FormType;
  /**
   * @param {string} [legend] - (optional) A Legend element instance to act as a caption for the fieldset.
   */
  legend?: LegendType;
  /**
   * @param {boolean} [disabled] - (optional) Boolean to specify whether the element should be disabled or not.
   */
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
  source: string;
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
  /**
   * @param {string} mediaType - Type of the source. Use enum MediaTypeEnum to define.
   */
  mediaType: MediaTypeEnum;
  /**
   * @param {SourceOptions} options - Specific options for the related media type.
   */
  options: SourceOptionsConstructor;
}

export interface CommonMediaConstructor extends CommonConstructor {
  /**
   * @param {string} [src] - (optional) URL of the media file. If used, children elements would then not be processed.
   */
  source?: string;
  /**
   * @param {Array.SourceType} [children] - (optional) An array containing the children Source elements is any.
   */
  children?: SourceType[];
  /**
   * @param {string} [noSupportMessage] - (optional) Text to be displayed if the browser does not support the feature.
   */
  noSupportMessage?: string;
  /**
   * @param {boolean} [autoplay] - (optional) Boolean to specify whether the element should be set on autoplay or not (not recommanded).
   */
  autoplay?: boolean;
  /**
   * @param {boolean} [showControls] - (optional) Boolean to specify whether the element should provide controls or not.
   */
  showControls?: boolean;
  /**
   * @param {boolean} [loop] - (optional) Boolean to specify whether the element should be set on loop or not.
   */
  loop?: boolean;
  /**
   * @param {boolean} [muted] - (optional) Boolean to specify whether the element should be muted or not.
   */
  muted?: boolean;
}

export interface AudioConstructor extends CommonMediaConstructor {}
export interface VideoConstructor extends AudioConstructor {
  /**
   * @param {number} [height] - (optional) The height of the video player in pixels (just the numeric value).
   */
  height?: number;
  /**
   * @param {number} [width] - (optional) The width of the video player in pixels (just the numeric value).
   */
  width?: number;
  /**
   * @param {string} [posterFrame] - (optional) An URL to a frame which will be displayed either when the player is loading or until the user launches the video.
   */
  posterFrame?: string;
}

export interface ImageConstructor extends CommonConstructor {
  /**
   * @param {string} source - URL/path of the image file.
   */
  source: string;
  /**
   * @param {string} description - Short description of the image (-> alt). Enter an empty string if the image is purely decorative.
   */
  description: string;
  /**
   * @param {string} [sourceSet] - (optional) An array of alternative sources matching the following pattern : "filepath width" (example: "mysource.png 480w")
   */
  sourceSet?: string[];
  /**
   * @param {string} [mediaQueries] - (optional) An array containing either a mediaquery associated to a width (example: "(min-width: 720px) 540px"), or only a width that will be used if no mediaquery has matched.
   */
  mediaQueries?: string[];
}

export interface PictureConstructor extends CommonConstructor {
  /**
   * @param {Array.(SourceType|ImageType)} [children] - (optional) An array containing the children Source or Image elements if any.
   */
  children?: (SourceType | ImageType)[];
}
