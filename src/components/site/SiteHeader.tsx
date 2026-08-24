"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mark, Wordmark } from "@/components/canvas/primitives";
import { P } from "@/lib/palette";

const NAV = [
  { href: "/", label: "Overview" },
  { href: "/playbook/logo", label: "Logo" },
  { href: "/playbook/color", label: "Color" },
  { href: "/playbook/type", label: "Type" },
  { href: "/playbook/layout", label: "Layout" },
  { href: "/playbook/motion", label: "Motion" },
  { href: "/playbook/voice", label: "Voice" },
  { href: "/playbook/social", label: "Social system" },
  { href: "/playbook/governance", label: "Governance" },
  { href: "/playbook/components", label: "Components" },
  { href: "/assets", label: "Assets" },
  { href: "/editor", label: "Editor" },
];

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="px-header">
      <div className="px-container px-header__inner">
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-3)", textDecoration: "none" }}>
          <Mark size={26} stroke={P.viridian600} node={P.brass500} />
          <Wordmark size={19} ink={P.ink} brand={P.viridian600} />
        </Link>
        <nav className="px-header__nav">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} data-active={n.href === "/" ? pathname === "/" : pathname.startsWith(n.href)}>
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
