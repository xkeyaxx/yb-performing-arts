"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PageIntro } from "@/components/SiteShell";
type EventItem = { id:string; title:string; date:string; description:string; category:string; time?:string; location?:string; price:string };
export default function EventsPage(){
 const [events,setEvents]=useState<EventItem[]>([]); const [loading,setLoading]=useState(true);
 useEffect(()=>{fetch("/api/events").then(r=>r.json()).then(d=>setEvents(d.events||[])).catch(()=>setEvents([])).finally(()=>setLoading(false));},[]);
 return <section className="page-main"><div className="page-container"><PageIntro kicker="THE PROGRAMME" title="Events & performances" description="Explore productions, workshops, and creative opportunities from the YB Performing Arts community."/>
 {loading?<p className="muted-note">Loading events…</p>:events.length===0?<div className="empty-state"><div className="empty-symbol">✧</div><h3>No events yet</h3><p>Check back later for upcoming events and performances.</p></div>:<div className="stack">{events.map(e=><article className="listing-card" key={e.id}><div className="listing-head"><span className="listing-meta">{e.category.toUpperCase()} · {new Date(`${e.date}T12:00:00`).toLocaleDateString(undefined,{month:"long",day:"numeric",year:"numeric"})}</span><span className="listing-meta">{e.price==="Free"?"COMPLIMENTARY":`$${e.price}`}</span></div><h3>{e.title}</h3><p>{e.description}</p><div className="listing-meta">◷ &nbsp;{e.time||"Time to be announced"} &nbsp;&nbsp; · &nbsp;&nbsp; ⌖ &nbsp;{e.location||"Location to be announced"}</div><div className="form-actions"><Link className="button button-dark" href="/tickets">Ticket registration ↗</Link></div></article>)}</div>}
 </div></section>
}
