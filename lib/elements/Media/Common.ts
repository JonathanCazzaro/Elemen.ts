import { CommonMediaConstructor } from "../../types/constructors";
import { MediaTypeEnum } from "../../types/enum";
import { SourceType } from "../../types/types";
import Common from "../Common";

export default class CommonMedia extends Common {
  src?: string;
  children?: SourceType[];
  noSupportMessage?: string;
  autoplay: boolean = false;
  showControls: boolean = false;
  loop: boolean = false;
  muted: boolean = false;

  constructor({
    id,
    classes,
    src,
    children,
    noSupportMessage,
    autoplay,
    showControls,
    loop,
    muted,
  }: CommonMediaConstructor) {
    super({ id, classes });
    if (src) this.src = src;
    else if (children) {
      children.forEach((child) => {
        if (child.mediaType === MediaTypeEnum.PICTURE)
          throw new Error(
            `The source element with media type PICTURE can only be used inside Picture elements.`
          );
      });
      this.children = children;
    }
    if (noSupportMessage) this.noSupportMessage = noSupportMessage;
    if (autoplay) this.autoplay = true;
    if (showControls) this.showControls = true;
    if (loop) this.loop = true;
    if (muted) this.muted = true;
  }
}
