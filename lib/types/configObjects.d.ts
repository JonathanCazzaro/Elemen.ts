import { InputPatternsEnum } from "./enum";

export type OnEventConfig = {
  /**
   * @param {function} onElement - Callback function to describe what happens when the element is the target of the event. First parameter gives access to the event.
   */
  onElement?: (event?: Event) => void;
};

export type OnFocusConfig = OnEventConfig & {
  /**
   * @param {function} onFocusLoss - Callback function to handle focus loss. First parameter gives access to the event.
   */
  onFocusLoss?: (event?: Event) => void;
};

export type OnClickConfig = OnEventConfig & {
  /**
   * @param {function} outsideElement - Callback function to handle clicks outside the element. First parameter gives access to the event.
   */
  outsideElement?: (event?: Event) => void;
};

export type OnHoverConfig = OnEventConfig & {
  /**
   * @param {function} onMouseLeave - Callback function to handle mouse leaving the element. First parameter gives access to the event.
   */
  onMouseLeave?: (event?: Event) => void;
};

export type CloneModifsConfig = {
  /**
   * @param {string} properties - The properties that will be modified on the new instances, each one separated with a space from the other.
   * @param {Array.Array.any} values - An array of arrays, each one containing the values for each new instance, in the same order you declared the properties right above.
   */
  properties: string;
  values: any[][];
};

export type AuthorizationConfig = {
  isRequired: boolean;
  userIsLogged: boolean;
};

export type ColumnsConfig = {
  columnExtension?: number;
  classes?: string[];
};

export type InputOptionsConfig = {
  checked?: boolean;
  min?: string | number;
  max?: string | number;
  incrementStep?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: PatternConfig;
  placeholder?: string | number;
  fileType?: string[];
  multiple?: boolean;
};

export type PatternConfig = {
  /**
   * @param {string} template - Conformity check based on a regex. Prebuilt patterns are available through enum InputPatternsEnum, though you can totally write your own regex.
   */
  template?: InputPatternsEnum | string;
  /**
   * @param {string} [help] - (optional) A description to help the user finding the correct format that shows up as a hint when the input is hovered.
   */
  help?: string;
};

export type FailMessagesConfig = {
  /**
   * @param {string} [patternMismatch] - If the input value doesn't match the regex pattern. Require to have a pattern template set up.
   */
  patternMismatch?: string;
  /**
   * @param {string} [tooHigh] - If the input value is above the maximum value. Require to have the max argument set up.
   */
  tooHigh?: string;
  /**
   * @param {string} [tooLow] - If the input value is below the minimum value. Require to have the min argument set up.
   */
  tooLow?: string;
  /**
   * @param {string} [incrementStepMismatch] - If the input value doesn't match the increment step. Require to have the incrementStep argument set up.
   */
  incrementStepMismatch?: string;
  /**
   * @param {string} [tooLong] - If the input value is longer than the maximum authorized length. Require to have the maxLength argument set up.
   */
  tooLong?: string;
  /**
   * @param {string} [tooShort] - If the input value is shorter than the minimum authorized length. Require to have the minLength argument set up.
   */
  tooShort?: string;
  /**
   * @param {string} [typeMismatch] - If the input value doesn't match the input type.
   */
  typeMismatch?: string;
  /**
   * @param {string} [valueMissing] - If the input is empty. Require to have the required argument set to true.
   */
  valueMissing?: string;
};

export type SourceOptionsConfig = {
  source?: string;
  type?: string;
  mediaQuery?: string;
  sourceSet?: string;
};
