import { scaleNormalize } from "../utils/scaleNormalize.util";

export enum Margins {
  smallest = scaleNormalize(4),
  smaller = scaleNormalize(8),
  default = scaleNormalize(16),
  larger = scaleNormalize(24),
  largest = scaleNormalize(36)
}

export enum Paddings {
    smallest = scaleNormalize(4),
    smaller = scaleNormalize(8),
    default = scaleNormalize(16),
    larger = scaleNormalize(24),
    largest = scaleNormalize(36)
}