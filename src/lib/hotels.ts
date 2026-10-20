import { supabase, supabaseConfigured } from "./supabase";

export type Hotel = {
  id: string;
  nom: string;
  ville: string;
  description: string | null;
  image: string | null;
};

/** Fallback démo si Supabase non configuré — clairement identifié. */
const DEMO_HOTELS: Hotel[] = [
  {
    id: "demo-lbv",
    nom: "MI CASA Libreville",
    ville: "Libreville",
    description: "Face à l'Atlantique, chambres lumineuses et service attentif.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "demo-pog",
    nom: "MI CASA Port-Gentil",
    ville: "Port-Gentil",
    description: "Au cœur de la capitale économique, confort moderne.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: "demo-fcv",
    nom: "MI CASA Franceville",
    ville: "Franceville",
    description: "Accueil chaleureux au centre du Gabon.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1400&q=80",
  },
];

export async function fetchHotels(): Promise<{ hotels: Hotel[]; source: "supabase" | "demo" }> {
  if (!supabaseConfigured) return { hotels: DEMO_HOTELS, source: "demo" };
  const { data, error } = await supabase
    .from("hotels")
    .select("id, nom, ville, description, image")
    .order("ville");
  if (error || !data?.length) return { hotels: DEMO_HOTELS, source: "demo" };
  return { hotels: data as Hotel[], source: "supabase" };
}
