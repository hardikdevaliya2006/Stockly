import { Link } from "react-router-dom";
import Icon, { ArrowRight, ImageOff } from "./Icon";

const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function ProductListItem({ product }) {
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
    <tr className="group hover:bg-slate-50/80 transition-colors border-b border-slate-100 last:border-b-0">
      <td className="py-3.5 pl-4 pr-3">
        <Link
          to={`/products/${product.id}`}
          className="flex items-center gap-3.5"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-slate-50 border border-slate-200/80 overflow-hidden flex items-center justify-center shrink-0">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            ) : (
              <Icon icon={ImageOff} size={18} className="text-slate-300" />
            )}
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors truncate max-w-[160px] sm:max-w-xs">
              {product.name}
            </h3>
            {product.description && (
              <p className="text-xs text-slate-400 truncate max-w-[160px] sm:max-w-xs mt-0.5">
                {product.description}
              </p>
            )}
          </div>
        </Link>
      </td>

      <td className="py-3.5 px-3 text-xs text-slate-600 whitespace-nowrap">
        <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium text-[11px]">
          {product.category}
        </span>
      </td>

      <td className="py-3.5 px-3 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide border ${badgeStyle}`}
        >
          {label}
        </span>
      </td>

      <td className="py-3.5 px-3 whitespace-nowrap">
        <strong className="text-sm font-bold text-slate-900 font-heading">
          {money.format(product.price)}
        </strong>
      </td>

      <td className="py-3.5 px-3 whitespace-nowrap hidden sm:table-cell">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600">
          <span
            className={`w-2 h-2 rounded-full ${
              product.is_active ? "bg-emerald-500" : "bg-slate-300"
            }`}
          />
          {product.is_active ? "Active" : "Draft"}
        </span>
      </td>

      <td className="py-3.5 pl-3 pr-4 text-right whitespace-nowrap">
        <Link
          to={`/products/${product.id}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          Details <Icon icon={ArrowRight} size={13} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </td>
    </tr>
  );
}
