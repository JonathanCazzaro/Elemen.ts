import { SourceOptionsConfig } from "../../types/configObjects";
import { SourceConstructor } from "../../types/constructors";
import { MediaTypeEnum } from "../../types/enum";
import Common from "../Common";

/**
 * Initiates a new Source.
 */
export default class Source extends Common {
  mediaType: MediaTypeEnum;
  options: SourceOptionsConfig;
  readonly render: HTMLSourceElement;

  /**
   * Initiates a new Source.
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {string} mediaType - Type of the source. Use enum MediaTypeEnum to define.
   * @param {SourceOptions} options - Specific options for the related media type.
   */
  constructor({
    id,
    classes,
    mediaType,
    options,
  }: SourceConstructor) {
    super({ id, classes });
    this.mediaType = mediaType;
    const parsedOptions = Object.entries(options);
    if (parsedOptions.length > 1)
      console.warn(
        "You cannot set multiple configuration objects as input options. By default, only the first object will be kept."
      );
    this.options = parsedOptions[0][1];
    let { mediaQuery } = options.PICTURE;
    if (mediaQuery) {
      if (!mediaQuery.startsWith('(')) mediaQuery = `(${mediaQuery}`;
      if (!mediaQuery.endsWith(')')) mediaQuery = `${mediaQuery})`;
    }
    this.render = this.build();
  }

  /**
   * Renders the HTML Element.
   */
  build(): HTMLSourceElement {
    const { mediaType, options } = this;
    const element = super.build("source") as HTMLSourceElement;
    switch (mediaType) {
      case MediaTypeEnum.AUDIO:
      case MediaTypeEnum.VIDEO:
        const { src, type } = options;
        element.src = src;
        if (type) element.type = type;
        break;
      case MediaTypeEnum.PICTURE:
        const { mediaQuery, sourceSet } = options;
        element.media = mediaQuery;
        element.srcset = sourceSet;
        element.type = type;
        break;
    }
    return element;
  }
}
