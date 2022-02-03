export enum FileEnum {
  CSS,
  JS,
}

export enum ScopeEnum {
  ROW = "row",
  COLUMN = "col",
  ROW_GROUP = "rowgroup",
  COLUMN_GROUP = "colgroup",
  AUTO = "auto",
}

export enum FormMethodEnum {
  GET = "get",
  POST = "post",
}

export enum ElementPositionEnum {
  TOP,
  BOTTOM,
}

export enum InputTypeEnum {
  BUTTON = "button",
  CHECKBOX = "checkbox",
  COLOR = "color",
  DATE = "date",
  DATETIME_LOCAL = "datetime-local",
  EMAIL = "email",
  FILE = "file",
  HIDDEN = "hidden",
  NUMBER = "number",
  PASSWORD = "password",
  RADIO = "radio",
  RANGE = "range",
  RESET = "reset",
  SEARCH = "search",
  SUBMIT = "submit",
  TEL = "tel",
  TEXT = "text",
  TIME = "time",
  URL = "url",
}

/**
 * Details of the built-in regex patterns for inputs like email, password, search, tel, text, or url.
 */
export enum InputPatternsEnum {
  /**
   * @param {string} STANDARD_EMAIL - Value should have at least a local part, a @ separator, and a domain name (server + extension).
   */
  STANDARD_EMAIL = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$",
  /**
   * @param {string} URL - Value should start with "http://" or "https://".
   */
  URL = "^https?://.+",
  /**
   * @param {string} BASIC_PASSWORD - Value should be 8 characters long minimum.
   */
  BASIC_PASSWORD = "^\\w{8,}$",
  /**
   * @param {string} STRONG_PASSWORD - Value should be 8 characters long minimum, including at least one digit, one uppercase letter, one lowercase letter, and a special character (!@#$%^&*).
   */
  STRONG_PASSWORD = "^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$",
  /**
   * @param {string} FRENCH_TEL - Value should be 5 groups of 2 digits, separated from each other by a point (.), a hyphen (-), a space ( ), or just nothing. First group must start with a 0.
   */
  FRENCH_TEL = "^0[1-9](( |-|\\.)?[0-9]{2}){4}$",
}

export enum ButtonTypeEnum {
  SUBMIT = "submit",
  BUTTON = "button",
  RESET = "reset",
}

export enum MediaTypeEnum {
  AUDIO,
  VIDEO,
  PICTURE,
}

export enum RoleEnum {
  VISITOR = "visitor",
  USER = "user",
  ADMIN = "admin",
}
