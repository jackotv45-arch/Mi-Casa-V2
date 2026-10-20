import { useQuery } from "@tanstack/react-query";
import { MapPin, Search, ArrowDown } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { HeroScene } from "@/components/HeroScene";
import { MagneticButton, ParallaxSection } from "@/components/Parallax";
import { fetchHotels } from "@/lib/hotels";

export function HomePage() {
  const { data } = useQuery({
    queryKey: ["hotels"],
    queryFn: fetchHotels,
    staleTime: 60_000,
  });
  const hotels = data?.hotels ?? [];
  const source = data?.source ?? "demo";
  const heroRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 120]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 60]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />

      <section ref={heroRef} className="relative min-h-[100svh] overflow-hidden bg-navy text-ivory">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=75"
            alt=""
            className="h-full w-full object-cover opacity-35"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/80 to-navy-soft/60" />
        </div>

        <HeroScene />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-4 pb-24 pt-28 md:px-6"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-xs uppercase tracking-[0.4em] text-copper"
          >
            Gabon · Trois adresses
          </motion.p>
          <motion.h1
            style={{ y: titleY }}
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-2xl font-serif text-5xl font-semibold leading-[1.05] md:text-7xl"
          >
            L'art de
            <br />
            <span className="text-copper">bien se loger</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 max-w-md text-base text-ivory/80 md:text-lg"
          >
            Chambres soignées, accueil attentif, réservation simple. MI CASA à Libreville, Port-Gentil et Franceville.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              href="#etablissements"
              className="inline-flex items-center gap-2 rounded-full bg-copper px-7 py-3.5 text-sm font-semibold text-navy shadow-lg shadow-copper/20"
            >
              <Search className="h-4 w-4" /> Voir les établissements
            </MagneticButton>
            <a href="tel:+241065827410" className="text-sm text-ivory/70 underline-offset-4 hover:text-ivory hover:underline">
              +241 065 82 74 10
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-ivory/50"
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        >
          <ArrowDown className="h-5 w-5" />
        </motion.div>
      </section>

      <section id="etablissements" className="relative mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <ParallaxSection speed={0.15}>
          <Reveal>
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-copper">Nos hôtels</p>
                <h2 className="mt-2 font-serif text-3xl font-semibold text-navy md:text-5xl">Trois villes, une exigence</h2>
              </div>
              {source === "demo" && (
                <p className="rounded-full border border-sand bg-sand/40 px-3 py-1 text-xs text-muted">
                  Données de démonstration — branchez Supabase pour le live
                </p>
              )}
            </div>
          </Reveal>
        </ParallaxSection>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {hotels.map((h, i) => (
            <Reveal key={h.id} delay={i * 0.1}>
              <motion.article
                whileHover={reduced ? undefined : { y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="group overflow-hidden rounded-2xl border border-sand bg-white shadow-sm"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={h.image || ""}
                    alt={h.nom}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
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
              </motion.article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-20 text-ivory">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-copper/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-ivory/10 blur-3xl" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 md:flex-row md:items-center md:px-6">
          <div>
            <h2 className="font-serif text-3xl font-semibold md:text-4xl">Une question ?</h2>
            <p className="mt-2 text-sm text-ivory/70">Notre équipe répond 7j/7 · Annulation selon CGV</p>
          </div>
          <MagneticButton
            href="tel:+241065827410"
            className="rounded-full bg-copper px-7 py-3.5 text-sm font-semibold text-navy"
          >
            +241 065 82 74 10
          </MagneticButton>
        </div>
      </section>

      <Footer />
    </div>
  );
}
