import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function AboutPage() {
  return (
    <div>
      <Navbar />
      <main className="section-shell py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan">About SELAVOLT</p>
          <h1 className="mt-4 text-4xl font-black text-brand-navy">Powering Rwanda&apos;s electric future.</h1>
          <p className="mt-5 text-slate-600">SELAVOLT is building a dependable, premium EV charging network for Rwanda&apos;s roads, cities, and commercial hubs. The platform is designed for scale, reliability, and operational excellence.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
