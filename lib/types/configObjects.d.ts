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
