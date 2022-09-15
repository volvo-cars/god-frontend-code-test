export const includesIgnoreCase = (source?: string, substring?: string): boolean => {
  if (!source || !substring) {
    return false;
  }

  return source.toString().toLowerCase().indexOf(substring.toString().toLowerCase()) > -1;
};
