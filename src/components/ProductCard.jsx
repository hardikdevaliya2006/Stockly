import { Link } from "react-router-dom";
import Icon, { ArrowRight, ImageOff } from "./Icon";

const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function ProductCard({ product }) {
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock < 10;

  const badgeStyle = isOutOfStock
    ? "bg-rose-50 text-rose-700 border-rose-200"
    : isLowStock
      ? "bg-amber-50 text-amber-800 border-amber-200"
      : "bg-emerald-50 text-emerald-700 border-emerald-200";

  const label = isOutOfStock
    ? "Out of stock"
    : isLowStock
      ? `Low: ${product.stock}`
      : `${product.stock} in stock`;

  return (
    <Link
      to={`/products/${product.id}`}
      className="group bg-white border border-slate-200 rounded-xl overflow-hidden  hover: hover:border-indigo-300 hover:-translate-y-0.5 transition-all flex flex-col"
    >
      <div className="bg-linear-to-br from-slate-50 to-indigo-50/40 relative flex items-center justify-center text-slate-300 overflow-hidden border-b border-slate-100">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <Icon icon={ImageOff} size={32} />
        )}
        <span
          className={`absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide border  ${badgeStyle}`}
        >
          {label}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
          {product.category}
        </span>
        <h3 className="font-heading font-bold text-slate-900 text-[15px] truncate group-hover:text-indigo-600 transition-colors mb-3">
          {product.name}
        </h3>
        <div className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100">
          <strong className="text-base font-extrabold text-slate-900 font-heading">
            {money.format(product.price)}
          </strong>
          <span className="text-xs font-semibold text-indigo-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
            View details <Icon icon={ArrowRight} size={13} />
          </span>
        </div>
      </div>
    </Link>
  );
}
