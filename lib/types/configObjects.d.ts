import { InputPatternsEnum } from "./enum";

export type ColumnsConfig = {
  columnExtension?: number;
  classes?: string[];
};

export type InputOptionsConfig = {
  checked?: boolean;
  min?: string;
  max?: string;
  incrementStep?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: PatternConfig;
  placeholder?: string;
};

export type PatternConfig = {
  /**
   * @param {string} template - Conformity check based on a regex. Prebuilt patterns are available through enum InputPatternsEnum, though you can totally write your own regex.
   */
  template: InputPatternsEnum | string;
  /**
   * @param {string} [help] - (optional) A description to help the user finding the correct format that shows up as a hint when the input is hovered.
   */
  help?: string;
  /**
   * @param {string} [customFailMessage] - (optional) A custom message displayed when the data validation did not pass.
   */
  customFailMessage?: string;
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
