import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";
import Icon, { Eye, EyeOff } from "../components/Icon";

export default function LoginPage() {
  const { login, user } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (user) return <Navigate to="/" replace />;

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    const { error } = await login(form.email, form.password);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Welcome back");
    nav("/");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50/70 via-slate-50 to-slate-100 flex items-center justify-center p-4 sm:p-6">
      <section className="w-full max-w-md bg-white border border-slate-200/90 rounded-2xl p-7 sm:p-9  shadow-slate-900/5">
        <div className="mb-8">
          <img className="h-10 w-auto max-h-10 object-contain rounded-md" src="/stockly_logo.png" alt="Stockly" />
        </div>
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-slate-500 mt-1.5">Sign in to manage your store inventory.</p>
        </div>
        <form onSubmit={submit} className="mt-7 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wide">
            Email address
            <input
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-normal text-slate-900 placeholder-slate-400 outline-none hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all normal-case tracking-normal"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@company.com"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wide">
            Password
            <span className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                className="w-full rounded-lg border border-slate-200 bg-white pl-3.5 pr-11 py-2.5 text-sm font-normal text-slate-900 placeholder-slate-400 outline-none hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all normal-case tracking-normal"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute right-2.5 w-7 h-7 rounded flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((value) => !value)}
              >
                <Icon icon={showPassword ? EyeOff : Eye} size={17} />
              </button>
            </span>
          </label>
          <button
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 active:scale-[0.99]  hover:shadow-indigo-500/20 transition-all disabled:opacity-60 cursor-pointer mt-2"
            disabled={busy}
          >
            {busy && <LoadingSpinner label="Signing in" className="text-white" />}
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="text-center text-xs text-slate-500 mt-6">
          New to Stockly?{" "}
          <Link to="/register" className="text-indigo-600 font-bold hover:underline">
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
}
