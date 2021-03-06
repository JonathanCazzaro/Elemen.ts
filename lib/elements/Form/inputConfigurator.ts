import {
  FailMessagesConfig,
  InputOptionsConfig,
} from "../../types/configObjects";
import {
  InputPatternsEnum,
  InputTypeEnum,
} from "../../types/enum";
import Str from "../../utils/str";
const { checkDate, checkDateTime, isValidRegex, checkTime } = Str;

const setInputOptions = (
  element: HTMLInputElement,
  options: InputOptionsConfig
): HTMLInputElement => {
  const {
    RADIO,
    CHECKBOX,
    DATE,
    DATETIME_LOCAL,
    TEL,
    URL,
    SEARCH,
    PASSWORD,
    EMAIL,
    FILE,
    RANGE,
    NUMBER,
    TEXT,
    TIME,
  } = InputTypeEnum;
  const { min, max, incrementStep, minLength, maxLength, pattern, placeholder, fileType, multiple  } = options;
  switch (element.type) {
    case RADIO:
    case CHECKBOX:
      element.checked = options.checked ? true : false;
      break;
    case DATE:
      if (min) {
        if (checkDate(min.toString())) element.min = min.toString();
        else
          throw new Error(
            "The minimum date is not matching the yyyy-MM-dd format."
          );
      }
      if (max) {
        if (checkDate(max.toString())) element.min = max.toString();
        else
          throw new Error(
            "The maximum date is not matching the yyyy-MM-dd format."
          );
      }
      if (incrementStep) element.step = incrementStep.toString();
      break;
    case DATETIME_LOCAL:
      if (min) {
        if (checkDateTime(min.toString())) element.min = min.toString();
        else
          throw new Error(
            "The minimum date is not matching the yyyy-MM-ddThh:mm format."
          );
      }
      if (max) {
        if (checkDateTime(max.toString())) element.min = max.toString();
        else
          throw new Error(
            "The maximum date is not matching the yyyy-MM-ddThh:mm format."
          );
      }
      if (incrementStep) element.step = incrementStep.toString();
      break;
    case TEL:
    case TEXT:
    case URL:
    case SEARCH:
    case PASSWORD:
    case EMAIL:
      if (minLength) element.minLength = minLength;
      if (maxLength) element.maxLength = maxLength;
      if (pattern) {
        const { template, help } = pattern;
        if (template) {
          const {
            BASIC_PASSWORD,
            STRONG_PASSWORD,
            STANDARD_EMAIL,
            FRENCH_TEL,
          } = InputPatternsEnum;
          switch (template) {
            case BASIC_PASSWORD:
            case STRONG_PASSWORD:
              if (element.type === PASSWORD) element.pattern = template;
              break;
            case STANDARD_EMAIL:
              if (element.type === EMAIL) element.pattern = template;
              break;
            case FRENCH_TEL:
              if (element.type === TEL) element.pattern = template;
              break;
            case InputPatternsEnum.URL:
              if (element.type === URL) element.pattern = template;
              break;
            default:
              if (isValidRegex(template)) {
                element.pattern = template;
              } else
                console.error(
                  `The pattern ${template} is not a valid Regex. As a consequence it has not been set up on the input.`
                );
          }
          if (help) element.title = help;
        }
      }
      if (placeholder) element.placeholder = placeholder.toString();
      break;
    case FILE:
      if (fileType) element.accept = fileType.join(",");
      element.multiple = multiple ? true : false;
      break;
    case RANGE:
    case NUMBER:
      if (min) element.min = min.toString();
      if (max) element.max = max.toString();
      if (incrementStep) element.step = incrementStep.toString();
      if (placeholder) element.placeholder = placeholder.toString();
      break;
    case TIME:
      if (min) {
        if (checkTime(min.toString())) element.min = min.toString();
        else
          throw new Error("The minimum time is not matching the hh:mm format.");
      }
      if (max) {
        if (checkTime(max.toString())) element.min = max.toString();
        else
          throw new Error("The maximum time is not matching the hh:mm format.");
      }
      if (incrementStep) element.step = incrementStep.toString();
      break;
  }
  return element;
};

function setValidationMessages(
  element: HTMLInputElement,
  customMessages: FailMessagesConfig
): HTMLInputElement;
function setValidationMessages(
  element: HTMLTextAreaElement,
  customMessages: FailMessagesConfig
): HTMLTextAreaElement;
function setValidationMessages(
  element: HTMLInputElement | HTMLTextAreaElement,
  customMessages: FailMessagesConfig
): HTMLInputElement | HTMLTextAreaElement {
  element.addEventListener("invalid", () => {
    const {
      patternMismatch,
      tooHigh,
      tooLow,
      tooLong,
      tooShort,
      incrementStepMismatch,
      typeMismatch,
      valueMissing,
    } = customMessages;
    let message = "";    

    for (const state in element.validity) {      
      if (element.validity[state]) {        
        switch (state) {
          case "valueMissing":
            message = valueMissing ? valueMissing : "";
            break;
          case "typeMismatch":
            message = typeMismatch ? typeMismatch : "";
            break;
          case "patternMismatch":
            message = patternMismatch ? patternMismatch : "";
            break;
          case "tooLong":
            message = tooLong ? tooLong : "";
            break;
          case "tooShort":
            message = tooShort ? tooShort : "";
            break;
          case "rangeUnderflow":
            message = tooLow ? tooLow : "";
            break;
          case "rangeOverflow":
            message = tooHigh ? tooHigh : "";
            break;
          case "stepMismatch":
            message = incrementStepMismatch ? incrementStepMismatch : "";
            break;
        }
      }
    }
    if (message) element.setCustomValidity(message);    
  });
  return element;
}

export { setInputOptions, setValidationMessages };
