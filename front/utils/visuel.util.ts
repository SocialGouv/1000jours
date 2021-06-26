export enum VisuelFormat {
  thumbnail = "thumbnail",
  small = "small",
  medium = "medium",
  large = "large",
}

export const getVisuelFormat = (
  url: string | undefined,
  format: VisuelFormat
): string | undefined => {
  return url ? url.replace("/uploads/", "/uploads/" + format + "_") : undefined;
};
