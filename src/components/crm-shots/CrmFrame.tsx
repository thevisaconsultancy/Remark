"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { LuLock } from "react-icons/lu";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const CHROME_H = 36;

type Tone = "void" | "paper" | "red";

const CAPTION_TONE: Record<Tone, string> = {
  void: "text-muted",
  paper: "text-ink-muted",
  red: "text-fg",
};

export type CrmFrameProps = {
  /** Width of the fixed-size canvas the screen is drawn at, in px. */
  width: number;
  /** Height of the canvas (without browser chrome), in px. */
  height: number;
  /** Meaningful description of what the shot shows, for assistive tech. */
  label: string;
  /** Short visible caption; "Sample data" is always appended. */
  caption?: string;
  /** Path shown in the browser chrome. Omit for no chrome (e.g. a PDF page or a phone). */
  url?: string;
  /**
   * Never scale below this. When the container is narrower than width * minScale,
   * the shot is cropped to a rounded window instead of shrinking the text further.
   */
  minScale?: number;
  /** When cropped, the canvas x (px) to start the visible window from (e.g. skip the sidebar). */
  cropX?: number;
  /** Register the caption sits on. */
  tone?: Tone;
  /** Classes for the outer figure. */
  className?: string;
  /** Classes for the frame surface (shadow, radius, ring). */
  frameClassName?: string;
  /** Extra style on the frame (e.g. a perspective tilt). */
  frameStyle?: CSSProperties;
  /** Corner radius of the frame, in canvas px. */
  radius?: number;
  /** Hide the caption (when a composition captions several shots at once). */
  noCaption?: boolean;
  children: ReactNode;
};

/**
 * A product shot: a CRM screen drawn at a fixed canvas size and scaled as one
 * piece with a CSS transform driven by the container's width, so text stays
 * crisp and proportions never squash. Optionally wrapped in browser chrome.
 */
export function CrmFrame({
  width,
  height,
  label,
  caption,
  url,
  minScale = 0,
  cropX = 0,
  tone = "paper",
  className = "",
  frameClassName = "shadow-[0_30px_80px_-30px_rgba(20,10,8,0.45)] ring-1 ring-black/10",
  frameStyle,
  noCaption = false,
  radius = 12,
  children,
}: CrmFrameProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState(0);
  const totalH = height + (url ? CHROME_H : 0);

  useIsoLayoutEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const measure = () => setBox(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const fit = box > 0 ? box / width : 0;
  const scale = box > 0 ? Math.max(fit, minScale) : 0;
  const cropped = scale > fit + 0.0001;
  const shown = width * scale;
  const shift = cropped ? Math.min(cropX * scale, shown - box) : 0;

  return (
    <figure className={`relative m-0 ${className}`}>
      <div
        ref={boxRef}
        role="img"
        aria-label={label}
        className="relative w-full"
        style={
          box > 0
            ? {
                height: totalH * scale,
                // Cropped: the container becomes a rounded window onto the screen.
                ...(cropped ? { overflow: "hidden", borderRadius: radius * scale } : null),
              }
            : { aspectRatio: `${width} / ${totalH}` }
        }
      >
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 origin-top-left"
          style={{
            width,
            height: totalH,
            transform: `translateX(${-shift}px) scale(${scale})`,
            visibility: box > 0 ? "visible" : "hidden",
          }}
        >
          <div
            className={`relative h-full w-full overflow-hidden bg-white ${frameClassName}`}
            style={{ borderRadius: radius, ...frameStyle }}
          >
            {url && (
              <div
                className="flex items-center gap-3 border-b border-black/20 bg-[#221d1b] px-4"
                style={{ height: CHROME_H }}
              >
                <span className="flex gap-[7px]">
                  <span className="h-[11px] w-[11px] rounded-full bg-[#4a4240]" />
                  <span className="h-[11px] w-[11px] rounded-full bg-[#4a4240]" />
                  <span className="h-[11px] w-[11px] rounded-full bg-[#4a4240]" />
                </span>
                <span className="ml-3 flex h-[22px] min-w-0 flex-1 items-center gap-2 rounded-[6px] bg-[#2f2927] px-3 font-mono text-[12px] text-[#c9c0bb]">
                  <LuLock className="h-3 w-3 shrink-0 opacity-70" />
                  <span className="truncate">crm.example.com{url}</span>
                </span>
                <span className="w-[60px]" />
              </div>
            )}
            <div className="relative" style={{ height }}>
              {children}
            </div>
          </div>
        </div>
      </div>
      {!noCaption && (
        <figcaption
          className={`mt-3 font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] ${CAPTION_TONE[tone]}`}
        >
          {caption ? `${caption} · ` : ""}Sample data
        </figcaption>
      )}
    </figure>
  );
}

/** Props every named shot accepts: everything but the canvas, plus an optional label override. */
export type ShotProps = Omit<CrmFrameProps, "width" | "height" | "label" | "children"> & { label?: string };
