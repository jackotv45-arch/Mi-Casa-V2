import { Link } from "@tanstack/react-router";
import { Menu, Phone } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const PHONE = "+241 065 82 74 10";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-sand/80 bg-ivory/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link to="/" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-navy font-serif text-lg font-bold text-ivory">
            MC
          </span>
          <div className="leading-tight">
            <div className="font-serif text-lg font-semibold tracking-wide text-navy">MI CASA</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted">Hôtel · Gabon</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-navy md:flex">
          <Link to="/" className="hover:text-copper">Accueil</Link>
          <a href="#etablissements" className="hover:text-copper">Établissements</a>
          <a href="#reserver" className="hover:text-copper">Réserver</a>
          <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="inline-flex items-center gap-1.5 text-muted hover:text-navy">
            <Phone className="h-3.5 w-3.5" /> {PHONE}
          </a>
        </nav>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border border-sand md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          <Menu className="h-5 w-5 text-navy" />
        </button>
      </div>

      <div className={cn("border-t border-sand md:hidden", open ? "block" : "hidden")}>
        <div className="flex flex-col gap-3 px-4 py-4 text-sm font-medium text-navy">
          <a href="#etablissements" onClick={() => setOpen(false)}>Établissements</a>
          <a href="#reserver" onClick={() => setOpen(false)}>Réserver</a>
          <a href={`tel:${PHONE.replace(/\s/g, "")}`}>{PHONE}</a>
        </div>
      </div>
    </header>
  );
}
