import Icon, { Search } from "./Icon";

export default function FilterBar({ filters, setFilters, categories }) {
  const change = (key, value) =>
    setFilters((f) => ({ ...f, [key]: value, page: 1 }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-3 pb-5 border-b border-slate-200">
      <label className="flex items-center bg-white border border-slate-200 rounded-lg px-3 py-2 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all cursor-text">
        <Icon icon={Search} size={17} className="text-slate-400 shrink-0 mr-2" />
        <input
          className="w-full bg-transparent border-0 text-slate-800 text-sm placeholder-slate-400 outline-none p-0"
          value={filters.search}
          onChange={(e) => change("search", e.target.value)}
          placeholder="Search products..."
        />
      </label>
      <select
        className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 outline-none hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer"
        value={filters.category}
        onChange={(e) => change("category", e.target.value)}
      >
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c.id} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>
      <select
        className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 outline-none hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer"
        value={filters.status}
        onChange={(e) => change("status", e.target.value)}
      >
        <option value="">All stock levels</option>
        <option value="in">In stock</option>
        <option value="low">Low stock</option>
        <option value="out">Out of stock</option>
      </select>
      <select
        className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 outline-none hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer"
        value={filters.sort}
        onChange={(e) => change("sort", e.target.value)}
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="name">Name A–Z</option>
        <option value="price_asc">Price: low to high</option>
        <option value="price_desc">Price: high to low</option>
      </select>
    </div>
  );
}
