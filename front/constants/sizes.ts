import { scaleNormalize } from "../utils/scaleNormalize.util";

export enum Sizes {
    xxxs = scaleNormalize(10),
    xxs = scaleNormalize(12),
    xs = scaleNormalize(14),
    sm = scaleNormalize(16),
    md = scaleNormalize(18),
    mmd = scaleNormalize(20),
    lg = scaleNormalize(22),
    xl = scaleNormalize(24),
    xxl = scaleNormalize(28),
    xxxl = scaleNormalize(36),
    xxxxl = scaleNormalize(46),
    giant = scaleNormalize(56),
  }

export default Sizes;