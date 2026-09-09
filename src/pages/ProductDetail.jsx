import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";
import Modal from "../components/Modal";
import Icon, { ChevronLeft } from "../components/Icon";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";
import {
  deleteProduct,
  getCategories,
  getProduct,
  saveProduct,
} from "../services/api";

export default function ProductDetail() {
  const { id } = useParams();
  const nav = useNavigate();

  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(!!id);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((e) => {
        setError(e.message);
        toast.error(e.message || "Unable to load categories");
      });
    if (id)
      getProduct(id)
        .then(setProduct)
        .catch((e) => {
          setError(e.message);
          toast.error(e.message || "Unable to load product");
        })
        .finally(() => setLoading(false));
  }, [id]);

  const submit = async (form) => {
    setBusy(true);
    try {
      const saved = await saveProduct(form, id);
      nav(`/products/${saved.id}`);
      setProduct(saved);
      toast.success(id ? "Product updated" : "Product created");
    } catch (e) {
      setError(e.message);
      toast.error(e.message || "Unable to save product");
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    setBusy(true);
    try {
      await deleteProduct(id);
      toast.success("Product deleted");
      nav("/");
    } catch (e) {
      setError(e.message);
      toast.error(e.message || "Unable to delete product");
      setBusy(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors mb-6 group cursor-pointer"
        >
          <Icon
            icon={ChevronLeft}
            size={16}
            className="group-hover:-translate-x-0.5 transition-transform"
          />{" "}
          Back to products
        </Link>

        {loading ? (
          <div className="min-h-[300px] flex items-center justify-center text-slate-500">
            <LoadingSpinner label="Loading product" size={24} />
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
                  {id ? product?.name || "Product" : "Add a product"}
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  {id
                    ? "Update product details and stock information."
                    : "Add an item to your store catalogue."}
                </p>
              </div>
              {id && (
                <button
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-rose-200 text-rose-600 text-xs font-bold hover:bg-rose-50 hover:border-rose-300 transition-colors cursor-pointer self-start sm:self-auto"
                  onClick={() => setConfirm(true)}
                >
                  Delete product
                </button>
              )}
            </div>

            {error && (
              <div className="p-3.5 rounded-lg text-sm bg-rose-50 text-rose-700 border border-rose-200 mb-6">
                {error}
              </div>
            )}

            <section className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 ">
              <ProductForm
                product={product}
                categories={categories}
                onSubmit={submit}
                busy={busy}
              />
            </section>
          </>
        )}

        <Modal
          open={confirm}
          onClose={() => setConfirm(false)}
          title="Delete this product?"
        >
          <p className="text-sm text-slate-500 leading-relaxed">
            This will permanently remove{" "}
            <strong className="text-slate-800">{product?.name}</strong> from
            your catalogue. This action cannot be undone.
          </p>
          <div className="flex items-center justify-end gap-2.5 mt-6">
            <button
              className="px-4 py-2 text-xs font-bold rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              onClick={() => setConfirm(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-xs font-bold rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition-colors disabled:opacity-50 cursor-pointer"
              disabled={busy}
              onClick={remove}
            >
              Delete product
            </button>
          </div>
        </Modal>
      </main>
    </>
  );
}
