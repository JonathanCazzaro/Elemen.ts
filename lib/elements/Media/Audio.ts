import { ProduceSettingsConfig } from "../../types/configObjects";
import { AudioConstructor } from "../../types/constructors";
import { AudioType } from "../../types/types";
import CommonMedia from "./Common";

/**
 * Initiates a new Audio.
 */
export default class Audio extends CommonMedia {
  static _class = Audio;

  /**
   * Initiates a new Audio.
   * @param {string} [id] - (optional)
   * @param {string} [data_id] - (optional) The identifier of the record if it comes from a database.
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {DisplayModeEnum} [displayMode] - (optional) Specifies if the component will be shared among pages (like a navbar) or should be loaded dynamically. Will produce effect only when using dynamic CSS/scripts imports within the Page API. Use enum DisplayModeEnum. Default is DYNAMIC.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {Array.SourceType} [children] - (optional) An array containing the children Source elements is any.
   * @param {string} [source] - (optional) URL/path of the media file. If used, children elements would then not be processed.
   * @param {string} [noSupportMessage] - (optional) Text to be displayed if the browser does not support the feature.
   * @param {boolean} [autoplay] - (optional) Boolean to specify whether the element should be set on autoplay or not (not recommanded).
   * @param {boolean} [showControls] - (optional) Boolean to specify whether the element should provide controls or not.
   * @param {boolean} [loop] - (optional) Boolean to specify whether the element should be set on loop or not.
   * @param {boolean} [muted] - (optional) Boolean to specify whether the element should be muted or not.
   */
  constructor({
    id,
    data_id,
    classes,
    exclusionList,
    source,
    children,
    noSupportMessage,
    autoplay,
    showControls,
    loop,
    muted,
    displayMode,
  }: AudioConstructor) {
    super({
      id,
      data_id,
      classes,
      exclusionList,
      children,
      source,
      noSupportMessage,
      autoplay,
      showControls,
      loop,
      muted,
      displayMode,
    });
    const element = this.build("audio");
    this.setRender(element);
  }

  // ***************************
  // Getters
  // ***************************

  get render(): HTMLAudioElement {
    return this._render as HTMLAudioElement;
  }

  static produce(settings: ProduceSettingsConfig): AudioType[] {
    return super.produce(settings) as AudioType[];
  }
}
