import { scaleNormalize } from "../utils/scaleNormalize.util";

/* eslint-disable sort-keys-fix/sort-keys-fix */
export const Margins = {
  evenMoreSmallest: scaleNormalize(2),
  smallest: scaleNormalize(4),
  smaller: scaleNormalize(8),
  light: scaleNormalize(10),
  default: scaleNormalize(16),
  larger: scaleNormalize(24),
  largest: scaleNormalize(36),
  step: scaleNormalize(60),
};

export const Paddings = {
  smallest: scaleNormalize(4),
  smaller: scaleNormalize(8),
  light: scaleNormalize(10),
  default: scaleNormalize(16),
  larger: scaleNormalize(24),
  largest: scaleNormalize(40),
  stepOffset: scaleNormalize(100),
};
