import Link from "next/link";

const nav = [
  { href: "/about", label: "About Simon" },
  { href: "/quote-builder", label: "Quote builder" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="global-header">
      <Link href="/" className="global-brand" aria-label="Tarrant Engineering home">
        <img src="/tarrant-engineering-logo.png" alt="Tarrant Engineering" />
      </Link>
      <nav aria-label="Main navigation">
        {nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
      </nav>
      <Link className="nav-cta" href="/quote-builder">Plan training <span>→</span></Link>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="global-footer">
      <div className="footer-branding">
        <img src="/tarrant-engineering-logo.png" alt="Tarrant Engineering" />
        <span className="brand-divider" aria-hidden="true" />
        <img src="/dta-logo.png" alt="Design and Technology Association" />
      </div>
      <div className="footer-links">
        <Link href="/quote-builder">Quote builder</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/privacy">Privacy</Link>
      </div>
      <div className="footer-meta">
        <p>Tarrant Engineering Ltd · Company no. 06009054 · Hampshire, UK</p>
        <p><a href="mailto:simon@tarranteng.co.uk">simon@tarranteng.co.uk</a> · <a href="tel:+447704910521">07704 910521</a></p>
      </div>
    </footer>
  );
}
