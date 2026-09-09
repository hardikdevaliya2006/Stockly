import { useRef, useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import Icon, { Pencil, Trash2, Upload } from "./Icon";
import { uploadProductImage } from "../services/api";

const initial = {
  name: "",
  description: "",
  price: "",
  category: "",
  stock: 0,
  image_url: "",
  is_active: true,
};

export default function ProductForm({ product, categories, onSubmit, busy }) {
  const [form, setForm] = useState(product ? { ...product } : initial);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInput = useRef(null);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const submit = (e) => {
    e.preventDefault();
    if (
      !form.name.trim() ||
      !form.category ||
      Number(form.price) <= 0 ||
      Number(form.stock) < 0
    ) {
      return toast.error("Provide a name, category, positive price, and valid stock.");
    }
    setError("");
    onSubmit(form);
  };

  const selectImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      return toast.error("Choose an image file.");
    }
    if (file.size > 5 * 1024 * 1024) {
      return toast.error("Images must be 5 MB or smaller.");
    }
    setUploading(true);
    try {
      update("image_url", await uploadProductImage(file));
      toast.success("Image uploaded");
    } catch (uploadError) {
      toast.error(uploadError.message || "Image upload failed");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={submit}>
      {error && (
        <div className="p-3.5 rounded-lg text-sm bg-rose-50 text-rose-700 border border-rose-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <label className="flex flex-col gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wide">
          Product name*
          <input
            className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-normal text-slate-900 placeholder-slate-400 outline-none hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all normal-case tracking-normal"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="e.g. Wireless Headphones"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wide">
          Category*
          <select
            className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-normal text-slate-900 outline-none hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all normal-case tracking-normal cursor-pointer"
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wide">
          Price (INR)*
          <input
            className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-normal text-slate-900 placeholder-slate-400 outline-none hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all normal-case tracking-normal"
            min="0"
            step="0.01"
            type="number"
            value={form.price}
            onChange={(e) => update("price", e.target.value)}
            placeholder="0.00"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wide">
          Stock quantity*
          <input
            className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-normal text-slate-900 placeholder-slate-400 outline-none hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all normal-case tracking-normal"
            min="0"
            type="number"
            value={form.stock}
            onChange={(e) => update("stock", e.target.value)}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wide">
        Description
        <textarea
          rows="4"
          className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-normal text-slate-900 placeholder-slate-400 outline-none hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all normal-case tracking-normal resize-y"
          value={form.description || ""}
          onChange={(e) => update("description", e.target.value)}
          placeholder="Add a concise product description..."
        />
      </label>

      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between text-slate-700 text-xs font-bold uppercase tracking-wide">
          <span>Product image</span>
          <small className="text-slate-400 font-normal lowercase">PNG, JPG, or WEBP · max 5 MB</small>
        </div>

        <input
          ref={fileInput}
          className="sr-only"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={selectImage}
        />

        {form.image_url ? (
          <div className="min-h-[130px] border border-slate-200 rounded-xl p-3 flex flex-col sm:flex-row items-center gap-4 bg-slate-50/50">
            <img
              src={form.image_url}
              alt="Product preview"
              className="w-24 h-24 rounded-lg object-cover bg-white shrink-0 border border-slate-200"
            />
            <div className="flex flex-col items-center sm:items-start gap-1.5 text-center sm:text-left">
              <strong className="text-sm font-semibold text-slate-800">Product image ready</strong>
              <span className="text-xs text-slate-500">Visible on product card and catalogue</span>
              <div className="flex items-center gap-2 mt-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer"
                  onClick={() => fileInput.current?.click()}
                  disabled={uploading}
                >
                  <Icon icon={Pencil} size={13} /> Change
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  onClick={() => update("image_url", "")}
                >
                  <Icon icon={Trash2} size={13} /> Remove
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="min-h-[130px] border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 hover:bg-indigo-50/40 hover:border-indigo-300 text-slate-500 hover:text-indigo-600 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer p-4 text-center"
            onClick={() => fileInput.current?.click()}
            disabled={uploading}
          >
            {uploading ? <LoadingSpinner label="Uploading image" /> : <Icon icon={Upload} size={22} />}
            <span className="text-xs font-semibold">{uploading ? "Uploading image…" : "Upload product image"}</span>
            <small className="text-[11px] text-slate-400">Click to browse your device</small>
          </button>
        )}
      </div>

      <label className="flex items-center gap-2.5 cursor-pointer text-sm font-medium text-slate-700 select-none">
        <input
          type="checkbox"
          className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500/30 border-slate-300 cursor-pointer"
          checked={form.is_active}
          onChange={(e) => update("is_active", e.target.checked)}
        />
        Active and visible in store
      </label>

      <button
        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 active:scale-[0.98]  hover:shadow-indigo-500/20 transition-all disabled:opacity-60 cursor-pointer self-start min-w-[140px]"
        disabled={busy || uploading}
      >
        {busy && <LoadingSpinner label="Saving product" className="text-white" />}
        {busy ? "Saving…" : product ? "Save changes" : "Create product"}
      </button>
    </form>
  );
}
