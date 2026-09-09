import Icon, { BadgeAlert, Boxes, CircleX, DollarSign } from "./Icon";

const cardConfig = {
  products: {
    icon: Boxes,
    style: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
  low: {
    icon: BadgeAlert,
    style: "bg-amber-50 text-amber-600 border-amber-100",
  },
  out: {
    icon: CircleX,
    style: "bg-rose-50 text-rose-600 border-rose-100",
  },
  value: {
    icon: DollarSign,
    style: "bg-emerald-50 text-emerald-600 border-emerald-100",
  },
};

export default function StatsCard({ type, label, value, helper }) {
  const config = cardConfig[type] || cardConfig.products;

  return (
    <section className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 flex items-start justify-between hover:border-slate-300 stransition-all">
      <div>
        <p className="text-xs font-bold text-slate-500 tracking-wider uppercase">
          {label}
        </p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tracking-tight mt-1.5">
          {value}
        </h2>
        <span className="text-xs text-slate-400 mt-1 block">{helper}</span>
      </div>
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${config.style}`}
      >
        <Icon icon={config.icon} size={22} />
      </div>
    </section>
  );
}
