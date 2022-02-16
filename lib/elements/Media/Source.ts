import { ProduceSettingsConfig, SourceOptionsConfig } from "../../types/configObjects";
import { SourceConstructor, SourceOptionsConstructor } from "../../types/constructors";
import { MediaTypeEnum } from "../../types/enum";
import { SourceType } from "../../types/types";
import Common from "../Common";

/**
 * Initiates a new Source.
 */
export default class Source extends Common {
  #mediaType: MediaTypeEnum;
  #options: SourceOptionsConfig;
  static _class = Source;

  /**
   * Initiates a new Source.
   * @param {string} [id] - (optional)
   * @param {string} [data_id] - (optional) The identifier of the record if it comes from a database.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {DisplayModeEnum} [displayMode] - (optional) Specifies if the component will be shared among pages (like a navbar) or should be loaded dynamically. Will produce effect only when using dynamic CSS/scripts imports within the Page API. Use enum DisplayModeEnum. Default is DYNAMIC.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {string} mediaType - Type of the source. Use enum MediaTypeEnum to define.
   * @param {SourceOptions} options - Specific options for the related media type.
   */
  constructor({ id, data_id, classes, exclusionList, mediaType, options, displayMode }: SourceConstructor) {
    super({ id, data_id, classes, exclusionList, displayMode });
    const element = this.build("source");
    this.setRender(element);
    this.setMediaType(mediaType);
    this.setOptions(options);
  }

  // ***************************
  // Getters
  // ***************************

  get render(): HTMLSourceElement {
    return this._render as HTMLSourceElement;
  }

  get mediaType(): MediaTypeEnum {
    return this.#mediaType;
  }

  get options(): SourceOptionsConfig {
    return this.#options;
  }

  // ***************************
  // Setters
  // ***************************

  setMediaType(mediaType: MediaTypeEnum) {
    this.#mediaType = mediaType;
  }

  setOptions(options: SourceOptionsConstructor) {
    const parsedOptions = Object.entries(options);
    if (parsedOptions.length > 1)
      console.warn("You cannot set multiple configuration objects as source options. By default, only the first object will be kept.");
    this.#options = parsedOptions[0][1];
    if (this.#options.mediaQuery) {
      let { mediaQuery } = this.#options;
      if (!mediaQuery.startsWith("(")) mediaQuery = `(${mediaQuery}`;
      if (!mediaQuery.endsWith(")")) mediaQuery = `${mediaQuery})`;
      this.#options.mediaQuery = mediaQuery;
    }
    switch (this.mediaType) {
      case MediaTypeEnum.AUDIO:
      case MediaTypeEnum.VIDEO:
        const { source, type } = this.#options;
        this.render.src = source;
        if (type) this.render.type = type;
        break;
      case MediaTypeEnum.PICTURE:
        const { mediaQuery, sourceSet } = this.#options;
        this.render.media = mediaQuery;
        this.render.srcset = sourceSet;
        this.render.type = type;
        break;
    }
  }
  static produce(settings: ProduceSettingsConfig): SourceType[] {
    return super.produce(settings) as SourceType[];
  }
}
