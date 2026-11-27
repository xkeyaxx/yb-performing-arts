"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type EventItem = { id: string; title: string; date: string; description: string; category: string; time?: string; location?: string; price: string };
export default function HomePage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  useEffect(() => { fetch("/api/events").then(r => r.json()).then(d => setEvents(d.events || [])).catch(() => setEvents([])); }, []);
  return <>
    <section className="home-hero">
      <div className="hero-curtain"/><div className="hero-curtain right"/><div className="hero-light"/>
      <div className="hero-inner">
        <p className="eyebrow">THE CAMPUS STAGE IS YOURS</p>
        <h1>Every story<br/>deserves a <em>stage.</em></h1>
        <p className="hero-copy">A creative home for performers, storytellers, and those who believe in the extraordinary power of live art.</p>
        <div className="hero-actions"><Link className="button button-gold" href="/events">Discover what’s on <span>→</span></Link><Link className="hero-text-link" href="/discussion">Join the conversation ↗</Link></div>
      </div>
      <div className="hero-caption"><span>YB PERFORMING ARTS</span><span>CREATIVITY · COMMUNITY · PERFORMANCE</span></div>
    </section>
    <section className="section-wrap home-intro"><p className="section-kicker">A PLACE TO CREATE</p><div className="intro-grid"><h2>More than a club.<br/><em>A creative home.</em></h2><div className="intro-copy"><p>Whether you love being in the spotlight or making the magic happen behind the scenes, there’s a place for you here.</p><p>YB Performing Arts is a community for curious minds and creative spirits to learn, collaborate, and put meaningful work on stage.</p></div></div></section>
    <section className="home-events"><div className="section-wrap"><div className="section-heading"><div><p className="section-kicker">MARK YOUR CALENDAR</p><h2 className="section-title">Coming <em>up next.</em></h2></div><Link className="button-outline button" href="/events">View all events ↗</Link></div>
      {events.length === 0 ? <div className="empty-state"><div className="empty-symbol">✧</div><h3>No events yet</h3><p>Check back later for upcoming performances and announcements.</p></div> : <div className="event-grid">{events.slice(0,3).map(event => <article className="event-card" key={event.id}><div className="event-art"><span className="event-art-label">YB / LIVE</span><span className="event-art-symbol">✧</span><span className="event-date">{new Date(`${event.date}T12:00:00`).toLocaleDateString(undefined,{month:"short",day:"numeric"})}</span></div><div className="event-details"><p className="event-type">{event.category}</p><h3>{event.title}</h3><p className="event-description">{event.description}</p><div className="event-meta"><span>◷ &nbsp;{event.time || "Time to be announced"}</span><span>⌖ &nbsp;{event.location || "Location to be announced"}</span></div><div className="event-bottom"><span>{event.price === "Free" ? "Complimentary" : `$${event.price}`}</span><Link href="/tickets">Tickets ↗</Link></div></div></article>)}</div>}
    </div></section>
    <section className="section-wrap home-values"><p className="section-kicker">THE SHOW IS BETTER TOGETHER</p><h2 className="section-title">There’s a role for <em>everyone.</em></h2><div className="values-grid"><article className="value-card"><span className="value-number">01</span><h3>See what’s on stage</h3><p>Find upcoming productions, showcases, workshops, and club events in one place.</p></article><article className="value-card"><span className="value-number">02</span><h3>Find your people</h3><p>A home for performers, writers, designers, stage managers, and theatre fans.</p></article><article className="value-card"><span className="value-number">03</span><h3>Make it happen</h3><p>Share ideas, join the conversation, and help bring new productions to life.</p></article></div></section>
    <section className="join-section"><p className="eyebrow">YOUR CUE IS COMING</p><h2>Ready to take<br/>your <em>place?</em></h2><p>Come as you are. Bring an idea, a talent, or simply a love of storytelling. There’s room for you at YB.</p><Link className="button button-gold" href="/discussion">Meet the community ↗</Link></section>
  </>;
}
