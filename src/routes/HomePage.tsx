import { useQuery } from "@tanstack/react-query";
import { MapPin, Search } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { fetchHotels } from "@/lib/hotels";

export function HomePage() {
  const { data } = useQuery({
    queryKey: ["hotels"],
    queryFn: fetchHotels,
    staleTime: 60_000,
  });
  const hotels = data?.hotels ?? [];
  const source = data?.source ?? "demo";

  return (
    <div className="min-h-screen">
      <Header />

      <section className="relative overflow-hidden bg-navy text-ivory">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=75"
            alt=""
            className="h-full w-full object-cover opacity-40"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-24 md:px-6 md:py-32">
          <p className="text-xs uppercase tracking-[0.35em] text-copper">Gabon · Trois adresses</p>
          <h1 className="mt-4 max-w-xl font-serif text-4xl font-semibold leading-tight md:text-6xl">
            L'art de bien se loger
          </h1>
          <p className="mt-4 max-w-md text-base text-ivory/80 md:text-lg">
            Chambres soignées, accueil attentif, réservation simple. MI CASA à Libreville, Port-Gentil et Franceville.
          </p>
          <a
            id="reserver"
            href="#etablissements"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-copper px-6 py-3 text-sm font-semibold text-navy transition hover:bg-sand"
          >
            <Search className="h-4 w-4" /> Voir les établissements
          </a>
        </div>
      </section>

      <section id="etablissements" className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <Reveal>
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-copper">Nos hôtels</p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-navy md:text-4xl">Trois villes, une exigence</h2>
            </div>
            {source === "demo" && (
              <p className="rounded-full border border-sand bg-sand/40 px-3 py-1 text-xs text-muted">
                Données de démonstration — branchez Supabase pour le live
              </p>
            )}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {hotels.map((h, i) => (
            <Reveal key={h.id} delay={i * 0.08}>
              <article className="group overflow-hidden rounded-2xl border border-sand bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={h.image || ""}
                    alt={h.nom}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted">
                    <MapPin className="h-3.5 w-3.5 text-copper" /> {h.ville}
                  </div>
                  <h3 className="mt-2 font-serif text-xl font-semibold text-navy">{h.nom}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{h.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-sand/50">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-12 md:flex-row md:items-center md:px-6">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-navy">Une question ?</h2>
            <p className="text-sm text-muted">Notre équipe répond 7j/7 · Annulation selon CGV</p>
          </div>
          <a
            href="tel:+241065827410"
            className="rounded-full bg-navy px-6 py-3 text-sm font-semibold text-ivory transition hover:bg-navy-soft"
          >
            +241 065 82 74 10
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
