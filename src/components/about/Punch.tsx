import { useId, type CSSProperties } from "react";
import type { PunchKind } from "@/data/about";
import styles from "./about.module.css";

/**
 * One hallmark punch, drawn as a recess struck into a surface: a sunken cartouche,
 * an inner shadow on the upper-left wall, a lit lower-right wall, and the glyph
 * standing in relief inside it.
 */

export type Metal = "red" | "void" | "paper";

type Palette = {
  recess: string;
  shadow: string;
  shadowOpacity: number;
  light: string;
  lightOpacity: number;
  glyph: string;
  glyphShadow: string;
  /** The ring pressed out around the punch on impact. */
  ink: string;
};

const PALETTES: Record<Metal, Palette> = {
  // Struck into the red bar: a darker red well, the letters left at surface red.
  red: {
    recess: "#8a0a0f",
    shadow: "#1f0003",
    shadowOpacity: 0.8,
    light: "#ff7a7e",
    lightOpacity: 0.45,
    glyph: "#c5161d",
    glyphShadow: "#3a0206",
    ink: "#5f000b",
  },
  // Struck into the dark: an oxblood well with the letters still hot.
  void: {
    recess: "#2c0005",
    shadow: "#000000",
    shadowOpacity: 0.85,
    light: "#e58b8c",
    lightOpacity: 0.28,
    glyph: "#b91319",
    glyphShadow: "#000000",
    ink: "#b91319",
  },
  // Struck into paper: the well is solid red material (never a hairline on paper).
  paper: {
    recess: "#b91319",
    shadow: "#2c0005",
    shadowOpacity: 0.7,
    light: "#ffffff",
    lightOpacity: 0.3,
    glyph: "#E6DFD6",
    glyphShadow: "#5f000b",
    ink: "#b91319",
  },
};

type Shape = { viewBox: [number, number]; outline: string };

const SHAPES: Record<PunchKind, Shape> = {
  // Maker's mark: a cut-corner cartouche.
  maker: { viewBox: [150, 96], outline: "M16 4H134L146 16V80L134 92H16L4 80V16Z" },
  // Standard mark: an oval.
  standard: {
    viewBox: [150, 96],
    outline: "M75 4C115 4 146 23.7 146 48S115 92 75 92 4 72.3 4 48 35 4 75 4Z",
  },
  // Office (town) mark: a shield.
  office: { viewBox: [112, 124], outline: "M6 6H106V64C106 96 84 110 56 120 28 110 6 96 6 64Z" },
};

const DISPLAY: CSSProperties = { fontFamily: "var(--font-display), serif" };

function Glyph({ kind, fill }: { kind: PunchKind; fill: string }) {
  if (kind === "maker") {
    return (
      <text x="75" y="50" textAnchor="middle" dominantBaseline="central" fontSize="60" fill={fill} style={DISPLAY}>
        RS
      </text>
    );
  }
  if (kind === "standard") {
    // Ideas -> reality: the arrow is the standard every piece is tested against.
    return <path d="M34 43H92L80 30H96L116 48 96 66H80L92 53H34Z" fill={fill} />;
  }
  return (
    <g fill={fill}>
      {/* The Margalla ridge that Islamabad sits beneath */}
      <path d="M16 56L32 40 42 47 58 26 70 40 80 33 96 56H86L80 46 72 52 58 38 44 56 38 52 26 56Z" />
      <text x="56" y="84" textAnchor="middle" dominantBaseline="central" fontSize="30" letterSpacing="1" style={DISPLAY}>
        ISB
      </text>
    </g>
  );
}

type PunchProps = {
  kind: PunchKind;
  metal?: Metal;
  className?: string;
  style?: CSSProperties;
  /** Draw the empty well only, with no glyph (a blank, not yet struck). */
  blank?: boolean;
  /**
   * Leave an ink ring around the punch when it is struck: squeezed out on impact, then
   * settling to a faint halo. Plays when an ancestor carries data-struck="true".
   */
  ink?: boolean;
};

export function Punch({ kind, metal = "red", className = "", style, blank = false, ink = false }: PunchProps) {
  const id = useId().replace(/:/g, "");
  const clip = `punch-clip-${id}`;
  const p = PALETTES[metal];
  const { viewBox, outline } = SHAPES[kind];
  const [w, h] = viewBox;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${w} ${h}`}
      className={className}
      style={style}
      overflow="visible"
    >
      <defs>
        <clipPath id={clip}>
          <path d={outline} />
        </clipPath>
      </defs>
      {ink && (
        <path d={outline} className={styles.ink} fill="none" stroke={p.ink} strokeWidth="5" strokeLinejoin="round" />
      )}
      <path d={outline} fill={p.recess} />
      <g clipPath={`url(#${clip})`}>
        {/* Upper-left wall in shadow */}
        <path d={outline} transform="translate(5 6)" fill="none" stroke={p.shadow} strokeOpacity={p.shadowOpacity} strokeWidth="12" />
        {/* Lower-right wall catching the light */}
        <path d={outline} transform="translate(-3 -3)" fill="none" stroke={p.light} strokeOpacity={p.lightOpacity} strokeWidth="4" />
        {!blank && (
          <>
            <g transform="translate(2 3)" opacity="0.75">
              <Glyph kind={kind} fill={p.glyphShadow} />
            </g>
            <Glyph kind={kind} fill={p.glyph} />
          </>
        )}
      </g>
    </svg>
  );
}
