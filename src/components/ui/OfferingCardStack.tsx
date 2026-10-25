import { CardStack, CardStackItem } from './CardStack';

interface OfferingCardStackProps {
  title: string;
  description: string;
  label: string;
  items: CardStackItem[];
}

export function OfferingCardStack({ title, description, label, items }: OfferingCardStackProps) {
  if (!items.length) return null;

  return (
    <section className="relative mb-20 overflow-hidden rounded-3xl border border-white/10 bg-[#071B2D]/70 px-4 py-8 sm:mb-24 sm:px-8 sm:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(84,174,211,0.16),transparent_60%)]" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-3xl space-y-3 text-center">
        <p className="font-alata text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">{label}</p>
        <h2 className="font-bebas text-3xl tracking-[0.04em] text-white sm:text-4xl">{title}</h2>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-300">{description}</p>
      </div>
      <div className="relative z-10 mx-auto mt-5 max-w-5xl">
        <CardStack items={items} label={title} cardWidth={440} cardHeight={285} maxVisible={5} overlap={0.5} autoAdvance={false} />
      </div>
    </section>
  );
}
