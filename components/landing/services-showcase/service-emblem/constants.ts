import { ServiceKey } from "~/components/landing/types";

/** Pentagon vertices in a 400×400 box, clockwise from the top. */
export const PENTAGON_VERTICES = Array.from({ length: 5 }, (_, index) => {
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / 5;
  return {
    x: Math.round((200 + Math.cos(angle) * 150) * 10) / 10,
    y: Math.round((212 + Math.sin(angle) * 150) * 10) / 10,
  };
});

/** Which vertex glows for each service, as in the brandbook's service marks. */
export const SERVICE_VERTEX: Record<ServiceKey, number> = {
  qa: 0,
  sd: 1,
  ps: 2,
  ux: 3,
  dv: 4,
};
