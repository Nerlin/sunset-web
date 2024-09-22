export function sanitizeEnvUrl(value: string = ""): string {
  if (value.endsWith("/")) {
    value = value.substring(0, value.length - 1);
  }
  return value;
}
