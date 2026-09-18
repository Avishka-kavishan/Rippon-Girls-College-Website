/**
 * Helper to prepend basePath for static exports on GitHub Pages
 */
export const basePath =
  process.env.NODE_ENV === "production"
    ? "/Rippon-Girls-College-Website"
    : "";

export const getAssetPath = (path: string): string => {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
};
