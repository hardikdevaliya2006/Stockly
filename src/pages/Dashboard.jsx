import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import ProductCard from "../components/ProductCard";
import ProductListItem from "../components/ProductListItem";
import FilterBar from "../components/FilterBar";
import Icon, {
  ChevronLeft,
  ChevronRight,
  ImageOff,
  LayoutGrid,
  List,
  Plus,
} from "../components/Icon";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";
import { getCategories, getProducts, getStats } from "../services/api";

const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function Dashboard() {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    status: "",
    sort: "newest",
    page: 1,
  });
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState(null);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState(() => {
    try {
      return localStorage.getItem("stockly_view_mode") || "grid";
    } catch {
      return "grid";
    }
  });

  const handleViewChange = (mode) => {
    setViewMode(mode);
    try {
      localStorage.setItem("stockly_view_mode", mode);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((e) => {
        setError(e.message);
        toast.error(e.message || "Unable to load categories");
      });
    getStats()
      .then(setStats)
      .catch((e) => {
        setError(e.message);
        toast.error(e.message || "Unable to load inventory stats");
      });
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      setLoading(true);
      getProducts(filters)
        .then(({ products, count }) => {
          setProducts(products);
          setCount(count);
        })
        .catch((e) => {
          setError(e.message);
          toast.error(e.message || "Unable to load products");
        })
        .finally(() => setLoading(false));
    }, 250);
    return () => clearTimeout(id);
  }, [filters]);

  const pages = Math.ceil(count / 12);

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase mb-1 block">
              Inventory Overview
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
              Product Dashboard
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Keep your catalogue accurate and ready to sell.
            </p>
          </div>
          <Link
            to="/products/new"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 active:scale-[0.98]  hover:shadow-indigo-500/20 transition-all cursor-pointer self-start sm:self-auto"
          >
            <Icon icon={Plus} size={17} /> Add product
          </Link>
        </div>

        {error && (
          <div className="p-3.5 rounded-lg text-sm bg-rose-50 text-rose-700 border border-rose-200 mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            type="products"
            label="Total products"
            value={stats?.total ?? "—"}
            helper="Active catalogue items"
          />
          <StatsCard
            type="low"
            label="Low stock"
            value={stats?.low ?? "—"}
            helper="Less than 10 items"
          />
          <StatsCard
            type="out"
            label="Out of stock"
            value={stats?.out ?? "—"}
            helper="Needs restocking"
          />
          <StatsCard
            type="value"
            label="Inventory value"
            value={stats ? money.format(stats.value) : "—"}
            helper="Based on current stock"
          />
        </div>

        <section className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 ">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-heading font-bold text-lg text-slate-900">Products</h2>
              <span className="text-xs text-slate-500">{count} items found</span>
            </div>
            <div className="inline-flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200/80">
              <button
                type="button"
                onClick={() => handleViewChange("grid")}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
                title="Grid view"
                aria-label="Grid view"
                aria-pressed={viewMode === "grid"}
              >
                <Icon icon={LayoutGrid} size={15} />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                type="button"
                onClick={() => handleViewChange("list")}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "list"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-500 hover:text-slate-900"
                }`}
                title="List view"
                aria-label="List view"
                aria-pressed={viewMode === "list"}
              >
                <Icon icon={List} size={15} />
                <span className="hidden sm:inline">List</span>
              </button>
            </div>
          </div>

          <FilterBar
            filters={filters}
            setFilters={setFilters}
            categories={categories}
          />

          {loading ? (
            <div className="min-h-[300px] flex items-center justify-center text-slate-500">
              <LoadingSpinner label="Loading products" size={24} />
            </div>
          ) : products.length ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-4 pt-5">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="pt-5 overflow-x-auto">
                <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      <th className="py-3 pl-4 pr-3">Product</th>
                      <th className="py-3 px-3">Category</th>
                      <th className="py-3 px-3">Stock level</th>
                      <th className="py-3 px-3">Price</th>
                      <th className="py-3 px-3 hidden sm:table-cell">Status</th>
                      <th className="py-3 pl-3 pr-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {products.map((p) => (
                      <ProductListItem key={p.id} product={p} />
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            <div className="min-h-[300px] flex flex-col items-center justify-center text-center p-8">
              <div className="text-slate-300 mb-2">
                <Icon icon={ImageOff} size={36} />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900">No products found</h3>
              <p className="text-sm text-slate-500 mt-1 mb-5 max-w-sm">
                Try a different filter, or add your first product.
              </p>
              <Link
                to="/products/new"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
              >
                Add product
              </Link>
            </div>
          )}

          {pages > 1 && (
            <div className="pt-6 flex items-center justify-center gap-4 text-xs font-medium text-slate-600">
              <button
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                disabled={filters.page === 1}
                onClick={() => setFilters((f) => ({ ...f, page: f.page - 1 }))}
              >
                <Icon icon={ChevronLeft} size={15} /> Previous
              </button>
              <span>
                Page {filters.page} of {pages}
              </span>
              <button
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                disabled={filters.page === pages}
                onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
              >
                Next <Icon icon={ChevronRight} size={15} />
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
