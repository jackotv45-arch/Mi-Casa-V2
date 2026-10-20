export function Footer() {
  return (
    <footer className="border-t border-sand bg-navy text-ivory">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <div className="font-serif text-2xl font-semibold">MI CASA HÔTEL</div>
          <p className="mt-2 text-sm text-ivory/70">L'art de bien se loger · Depuis 2026</p>
        </div>
        <div className="text-sm text-ivory/80">
          <p>Libreville · Port-Gentil · Franceville</p>
          <p className="mt-1">+241 065 82 74 10</p>
          <p>contact@mi-casa-hotel.ga</p>
        </div>
        <div className="text-sm text-ivory/60">
          <p>Mentions légales · CGV · Confidentialité</p>
          <p className="mt-4">© {new Date().getFullYear()} MI CASA HÔTEL SARL</p>
        </div>
      </div>
    </footer>
  );
}
