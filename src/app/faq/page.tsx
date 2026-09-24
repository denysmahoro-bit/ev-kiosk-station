import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { faqs } from '@/data/mock';

export default function FaqPage() {
  return (
    <div>
      <Navbar />
      <main className="section-shell py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan">FAQ</p>
          <h1 className="mt-4 text-4xl font-black text-brand-navy">Charging questions, answered simply</h1>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {faqs.map((item) => (
            <div key={item.question} className="card-surface p-6">
              <h2 className="text-lg font-bold text-brand-navy">{item.question}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
