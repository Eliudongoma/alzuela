export const getBoolean = (value: unknown): boolean => {
  return value ? true : false;
};

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
