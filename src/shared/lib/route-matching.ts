export function normalizePathname(pathname: string) {
  if (!pathname) return "/";
  if (pathname === "/") return pathname;

  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

export function isRouteActive(pathname: string, href: string) {
  const normalizedPathname = normalizePathname(pathname);
  const normalizedHref = normalizePathname(href);

  return normalizedPathname === normalizedHref || normalizedPathname.startsWith(`${normalizedHref}/`);
}
