// Which edge of a box the pointer crossed: the same test DirectionalLiquidButton uses,
// shared here by the liquid submit and the phone-number wipe.
export type Edge = "top" | "right" | "bottom" | "left";

export function getEdge(el: Element, clientX: number, clientY: number): Edge {
  const rect = el.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  const distances: [Edge, number][] = [
    ["top", y],
    ["bottom", rect.height - y],
    ["left", x],
    ["right", rect.width - x],
  ];
  return distances.reduce((min, d) => (d[1] < min[1] ? d : min))[0];
}
