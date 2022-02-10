import { AudioConstructor } from "../../types/constructors";
import CommonMedia from "./Common";

/**
 * Initiates a new Audio.
 */
export default class Audio extends CommonMedia {
  #render: HTMLAudioElement;

  /**
   * Initiates a new Audio.
   * @param {string} [id] - (optional)
   * @param {string} [classes] - (optional) A space is needed between each class.
   * @param {Array.string} [exclusionList] - (optional) An array of paths of which the component shouldn't be mounted.
   * @param {Array.SourceType} [children] - (optional) An array containing the children Source elements is any.
   * @param {string} [source] - (optional) URL/path of the media file. If used, children elements would then not be processed.
   * @param {string} [noSupportMessage] - (optional) Text to be displayed if the browser does not support the feature.
   * @param {boolean} [autoplay] - (optional) Boolean to specify whether the element should be set on autoplay or not (not recommanded).
   * @param {boolean} [showControls] - (optional) Boolean to specify whether the element should provide controls or not.
   * @param {boolean} [loop] - (optional) Boolean to specify whether the element should be set on loop or not.
   * @param {boolean} [muted] - (optional) Boolean to specify whether the element should be muted or not.
   */
  constructor({ id, classes, exclusionList, source, children, noSupportMessage, autoplay, showControls, loop, muted }: AudioConstructor) {
    super({
      id,
      classes,
      exclusionList,
      children,
      source,
      noSupportMessage,
      autoplay,
      showControls,
      loop,
      muted,
    });
    const { setRender, build } = this;
    setRender(build("audio"));
  }

  // ***************************
  // Getters
  // ***************************

  get render(): HTMLAudioElement {
    return this.#render;
  }

  // ***************************
  // Setters
  // ***************************

  setRender(render: HTMLAudioElement) {
    this.#render = render;
  }
}
