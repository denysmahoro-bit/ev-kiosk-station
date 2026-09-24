import Link from 'next/link';
import { ArrowRight, BatteryCharging, Building2, MapPinned, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { SectionHeading } from '@/components/section-heading';
import { faqs, stats, stations } from '@/data/mock';
import { StatusBadge } from '@/components/status-badge';

export default function HomePage() {
  return (
    <div>
      <Navbar />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-grid bg-[size:30px_30px] opacity-30" />
          <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-brand-green/10 blur-3xl" />
          <div className="absolute right-10 top-10 h-80 w-80 rounded-full bg-brand-cyan/10 blur-3xl" />

          <div className="section-shell relative grid gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
            <div>
              <div className="inline-flex items-center rounded-full border border-brand-cyan/20 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-brand-navy">
                Rwanda EV network
              </div>
              <h1 className="mt-6 max-w-xl text-5xl font-black tracking-tight text-brand-navy sm:text-6xl">
                Charge Forward with <span className="text-brand-green">SELAVOLT</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-slate-600">
                Reliable EV charging infrastructure connecting Rwanda&apos;s roads, cities and businesses.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/stations" variant="primary">Find a Charger</Button>
                <Button href="/contact" variant="secondary">Become a Partner</Button>
              </div>

              <div className="mt-10 flex flex-wrap gap-8 text-sm text-slate-600">
                <div>
                  <p className="text-2xl font-black text-brand-navy">32</p>
                  <p>Stations</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-brand-navy">148</p>
                  <p>Chargers</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-brand-navy">24/7</p>
                  <p>Support</p>
                </div>
              </div>
            </div>

            <div className="card-surface relative overflow-hidden p-5">
              <div className="rounded-[28px] bg-brand-navy p-6 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-brand-cyan">Live station</p>
                    <h3 className="mt-3 text-2xl font-bold">Kigali Central Hub</h3>
                  </div>
                  <StatusBadge status="Available" />
                </div>

                <div className="mt-8 rounded-2xl bg-white/5 p-5">
                  <div className="flex items-center justify-between text-sm text-slate-200">
                    <span>Station status</span>
                    <span>Open</span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div className="rounded-2xl bg-white/5 p-4">
                      <p className="text-slate-300">Power</p>
                      <p className="mt-2 text-xl font-bold">120 kW</p>
                    </div>
                    <div className="rounded-2xl bg-white/5 p-4">
                      <p className="text-slate-300">Connector</p>
                      <p className="mt-2 text-xl font-bold">CCS2</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-2xl bg-gradient-to-r from-brand-green to-brand-cyan p-4 text-brand-navy">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em]">Current rate</p>
                      <p className="mt-2 text-3xl font-black">RWF 420 / kWh</p>
                    </div>
                    <div className="rounded-full bg-white/70 p-3">
                      <Zap className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell py-20">
          <SectionHeading
            eyebrow="Why SELAVOLT"
            title="A charging network designed for confidence and scale"
            description="From intercity highways to urban centers, SELAVOLT makes EV charging fast, transparent, and dependable."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: BatteryCharging, title: 'Fast charging', text: 'Ultra-fast hubs and dependable charging lanes along Rwanda’s busiest corridors.' },
              { icon: ShieldCheck, title: 'Secure operations', text: 'Built for uptime, billing integrity, and role-based access across stations and teams.' },
              { icon: MapPinned, title: 'Smart routing', text: 'Find the best available charger near your route, office, or home in just a few taps.' }
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="card-surface p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-cyan/10 text-brand-navy">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-brand-navy">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-brand-navy py-20 text-white">
          <div className="section-shell">
            <SectionHeading eyebrow="Network" title="Find a charging station" description="Browse the current charging map across Kigali, Nyanza, Nyagatare, and Rusumo." />

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {stations.map((station) => (
                <div key={station.id} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">{station.name}</h3>
                    <StatusBadge status={station.status} />
                  </div>
                  <p className="mt-3 text-sm text-slate-300">{station.location}</p>
                  <div className="mt-5 flex items-center justify-between text-sm text-slate-300">
                    <span>{station.distanceKm} km</span>
                    <span>{station.power}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-slate-300">
                    <span>{station.connector}</span>
                    <span>RWF {station.priceRwf}/kWh</span>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm text-slate-300">{station.availableChargers} available</span>
                    <Link href={`/stations/${station.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-cyan">
                      View <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading eyebrow="How it works" title="Fast, clear, and built for everyday EV drivers" />
            </div>
            <div className="space-y-6">
              {[
                'Choose a nearby station and charger.',
                'Confirm your connector and payment method.',
                'Start, monitor, and stop your session from the app.',
                'Receive a clean receipt and drive away with confidence.'
              ].map((step, index) => (
                <div key={step} className="flex items-start gap-4 rounded-2xl bg-white p-4 shadow-soft">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-green text-sm font-black text-brand-navy">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-base text-slate-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20">
          <div className="section-shell">
            <SectionHeading eyebrow="Network impact" title="Built for Rwanda's future of mobility" />
            <div className="mt-12 grid gap-6 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="card-surface p-6 text-center">
                  <p className="text-3xl font-black text-brand-navy">{stat.value}</p>
                  <p className="mt-2 text-sm text-slate-600">{stat.label}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.2em] text-brand-cyan">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell py-20">
          <SectionHeading eyebrow="Partners" title="Built for businesses, fleets, and public infrastructure" description="SELAVOLT supports private charging, business fleets, retail hubs, and high-traffic public stations." />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { title: 'Retail partners', text: 'Drive EV adoption at commercial centers and hotels.' },
              { title: 'Fleet operators', text: 'Manage repeat routes and predictable charging windows.' },
              { title: 'Public infrastructure', text: 'Support Rwanda’s transportation and tourism growth.' }
            ].map((item) => (
              <div key={item.title} className="card-surface p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green/10 text-brand-navy">
                  <Building2 className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-brand-navy">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-shell py-20">
          <SectionHeading eyebrow="FAQ" title="Questions drivers ask" />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {faqs.map((item) => (
              <div key={item.question} className="card-surface p-6">
                <h3 className="text-lg font-bold text-brand-navy">{item.question}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
