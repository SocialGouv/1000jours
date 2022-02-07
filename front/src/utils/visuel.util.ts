import type { Visuel } from "../types";

export enum VisuelFormat {
  thumbnail = "thumbnail",
  small = "small",
  medium = "medium",
  large = "large",
}

const minSizes = (visuelFormat: VisuelFormat) => {
  const minSizesMap = new Map<VisuelFormat, number>();
  minSizesMap.set(VisuelFormat.large, 1000);
  minSizesMap.set(VisuelFormat.medium, 750);
  minSizesMap.set(VisuelFormat.small, 500);
  minSizesMap.set(VisuelFormat.thumbnail, 0);
  return minSizesMap.get(visuelFormat);
};

export const getVisuelFormat = (
  visuel: Visuel | undefined,
  format: VisuelFormat
): string | undefined => {
  const minSize = minSizes(format);
  if (visuel && minSize && (visuel.width > minSize || visuel.height > minSize))
    return visuel.url.replace("/uploads/", "/uploads/" + format + "_");
  return visuel?.url ?? undefined;
};
