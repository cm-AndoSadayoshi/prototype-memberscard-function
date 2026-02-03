export const ROUTE_STEPS = {
  SCAN: "scan",
  TEMPORARY_HOME: "temporary-home",
  REGISTER: "register",
  HOME: "home",
} as const;

export function getRoute(basePath: string, step: keyof typeof ROUTE_STEPS) {
  return `${basePath}/${ROUTE_STEPS[step]}`;
}
