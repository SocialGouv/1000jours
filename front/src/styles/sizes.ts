/* eslint-disable sort-keys-fix/sort-keys-fix */

import { scaleNormalize } from "../utils/scaleNormalize.util";

const Sizes = {
  xxxxxxs: scaleNormalize(4),
  xxxxxs: scaleNormalize(6),
  xxxxs: scaleNormalize(8),
  xxxs: scaleNormalize(10),
  xxs: scaleNormalize(12),
  xs: scaleNormalize(14),
  sm: scaleNormalize(16),
  md: scaleNormalize(18),
  mmd: scaleNormalize(20),
  lg: scaleNormalize(22),
  xl: scaleNormalize(24),
  xxl: scaleNormalize(28),
  xxxl: scaleNormalize(36),
  xxxxl: scaleNormalize(46),
  xxxxxl: scaleNormalize(60),
  big: scaleNormalize(250),
  giant: scaleNormalize(300),
  logo: scaleNormalize(70),
  step: scaleNormalize(80),
  timelineBlock: scaleNormalize(100),
  thumbnail: scaleNormalize(100),
  minButton: scaleNormalize(48),
};

export default Sizes;
