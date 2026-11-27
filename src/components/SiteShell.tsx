import Link from "next/link";

const links = [
  ["Home", "/"],
  ["Events", "/events"],
  ["Discussion", "/discussion"],
  ["Tickets", "/tickets"],
  ["Cabinet", "/cabinet"],
] as const;

export function SiteHeader() {
  return <>
    <div className="announcement">✦ &nbsp; A HOME FOR CREATIVITY, PERFORMANCE & COMMUNITY &nbsp; ✦</div>
    <header className="site-header">
      <Link className="brand" href="/" aria-label="YB Performing Arts home">
        <span className="brand-monogram">YB</span>
        <span className="brand-wordmark">YB <strong>PERFORMING ARTS</strong></span>
      </Link>
      <nav className="main-nav" aria-label="Main navigation">
        {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
      </nav>
      <Link className="header-cta" href="/events">Explore the programme <span>↗</span></Link>
    </header>
  </>;
}

export function SiteFooter() {
  return <footer className="site-footer">
    <Link className="footer-monogram" href="/">YB.</Link>
    <div className="footer-rule" />
    <p>Made for stories worth telling.</p>
    <div className="footer-links">{links.slice(1).map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>
    <small>✦ &nbsp; CREATIVITY · COMMUNITY · PERFORMANCE &nbsp; ✦</small>
    <small className="copyright">© {new Date().getFullYear()} YB Performing Arts. All rights reserved.</small>
  </footer>;
}

export function PageIntro({ kicker, title, description }: { kicker: string; title: string; description: string }) {
  return <div className="page-intro"><p className="section-kicker">{kicker}</p><h1>{title}</h1><p className="page-description">{description}</p><span className="intro-ornament">✧</span></div>;
}
