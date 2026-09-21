import { FULL_BRIEF } from "@/lib/brand-brief";

/**
 * Serves the brand brief as a real .md file at a stable URL, so it can be handed to
 * any tool that reads a link. Under `output: "export"` Next copies a static route
 * handler's body to `out/<route>` verbatim, which makes this `out/brand-brief.md`.
 */
export const dynamic = "force-static";

export function GET() {
  return new Response(FULL_BRIEF, {
    headers: { "content-type": "text/markdown; charset=utf-8" },
  });
}
