import {
  FailMessagesConfig,
  InputOptionsConfig,
} from "../../types/configObjects";
import { InputPatternsEnum, InputTypeEnum } from "../../types/enum";
import Str from "../../utils/str";

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
  switch (element.type) {
    case RADIO:
    case CHECKBOX:
      if (options.checked) element.checked = true;
      break;
    case DATE:
      const { min, max, incrementStep } = options;
      if (min) {
        if (Str.checkDate(min.toString())) element.min = min.toString();
        else
          throw new Error(
            "The minimum date is not matching the yyyy-MM-dd format."
          );
      }
      if (max) {
        if (Str.checkDate(max.toString())) element.min = max.toString();
        else
          throw new Error(
            "The maximum date is not matching the yyyy-MM-dd format."
          );
      }
      if (incrementStep) element.step = incrementStep.toString();
      break;
    case DATETIME_LOCAL:
      if (min) {
        if (Str.checkDateTime(min.toString())) element.min = min.toString();
        else
          throw new Error(
            "The minimum date is not matching the yyyy-MM-ddThh:mm format."
          );
      }
      if (max) {
        if (Str.checkDateTime(max.toString())) element.min = max.toString();
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
      const { minLength, maxLength, pattern, placeholder } = options;
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
              if (Str.isValidRegex(template)) {
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
      const { fileType, multiple } = options;
      if (fileType) element.accept = fileType.join(",");
      if (multiple) element.multiple = true;
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
        if (Str.checkTime(min.toString())) element.min = min.toString();
        else
          throw new Error("The minimum time is not matching the hh:mm format.");
      }
      if (max) {
        if (Str.checkTime(max.toString())) element.min = max.toString();
        else
          throw new Error("The maximum time is not matching the hh:mm format.");
      }
      if (incrementStep) element.step = incrementStep.toString();
      break;
  }
  return element;
};

const setValidationMessages = (
  element: HTMLInputElement,
  customMessages: FailMessagesConfig
): HTMLInputElement => {
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

    for (const state in element) {
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
};

export { setInputOptions, setValidationMessages };
