/**
 * Literal token values for artboard rendering.
 *
 * Artboards use literal hex rather than `var(--token)` because exported rasters are
 * produced by cloning the node into an off-document tree; literals remove any
 * dependency on inherited custom properties. Every value here is copied verbatim
 * from `src/styles/tokens.css` — if a token moves, move it here too.
 */

export const P = {
  viridian100: "#DDEDE7", viridian200: "#AFD6C9", viridian300: "#6DB4A0",
  viridian400: "#2F8A72", viridian500: "#166553", viridian600: "#0E5A4A",
  viridian700: "#0B4A3D", viridian800: "#0A3B31", viridian900: "#0A2B25",
  neutral0: "#FCFDFB", neutral50: "#F6F8F4", neutral100: "#EFF2EC", neutral200: "#E3E8E1",
  neutral300: "#CBD4CC", neutral400: "#9EAAA3", neutral500: "#6E7B75", neutral600: "#45524C",
  neutral700: "#2A3530", neutral800: "#19221E", neutral900: "#0C110F",
  brass300: "#E4C87E", brass500: "#C0912F", brass700: "#8A6414",
  ink: "#141B18", inkInverse: "#E9EDE8", onBrand: "#F2F7F4", foundation: "#0C110F",
  success: "#23744F", warning: "#9A6A12", danger: "#A63A2B", info: "#2B647F",
} as const;

export const FONT_SANS = '"Archivo", system-ui, sans-serif';
export const FONT_SERIF = '"Newsreader", Georgia, serif';
export const FONT_MONO = '"IBM Plex Mono", ui-monospace, monospace';

export type Skin = {
  bg: string;
  text: string;
  secondary: string;
  muted: string;
  border: string;
  divider: string;
  panel: string;
  accent: string;
  brandInk: string;
  dark: boolean;
};

/** Resolve a surface + accent choice into the concrete colours an artboard draws with. */
export function skinFor(surface: string, accent: "brass" | "viridian"): Skin {
  const base: Record<string, Skin> = {
    paper: {
      bg: P.neutral100, text: P.ink, secondary: P.neutral600, muted: P.neutral500,
      border: P.neutral300, divider: "#DCE2DB", panel: P.neutral0,
      accent: P.brass700, brandInk: P.viridian600, dark: false,
    },
    elevated: {
      bg: P.neutral0, text: P.ink, secondary: P.neutral600, muted: P.neutral500,
      border: P.neutral300, divider: "#DCE2DB", panel: P.neutral100,
      accent: P.brass700, brandInk: P.viridian600, dark: false,
    },
    muted: {
      bg: P.neutral200, text: P.ink, secondary: P.neutral600, muted: P.neutral500,
      border: P.neutral400, divider: P.neutral300, panel: P.neutral0,
      accent: P.brass700, brandInk: P.viridian600, dark: false,
    },
    foundation: {
      bg: P.foundation, text: P.inkInverse, secondary: "#A9B4AD", muted: "#77837C",
      border: "#263029", divider: "#1C2621", panel: "#141B17",
      accent: P.brass300, brandInk: "#3FA98D", dark: true,
    },
    brand: {
      bg: P.viridian700, text: P.onBrand, secondary: "#B9D6CC", muted: "#8FB8AB",
      border: "#1B6553", divider: "#155345", panel: P.viridian800,
      accent: P.brass300, brandInk: P.onBrand, dark: true,
    },
  };
  const skin = base[surface] ?? base.paper;
  if (accent === "viridian") return { ...skin, accent: skin.brandInk };
  return skin;
}
