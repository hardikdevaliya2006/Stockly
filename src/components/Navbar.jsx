import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/useAuth";
import Icon, { LogOut } from "./Icon";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const name = user?.user_metadata?.name || "Admin";
  const initials =
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "AD";

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 h-[68px] border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 md:px-8 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
        >
          <img
            className="h-9 w-auto max-h-9 object-contain rounded-md"
            src="/stockly_logo.png"
            alt="Stockly"
          />
        </Link>
        <div ref={menuRef} className="relative flex items-center gap-3">
          <button
            className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 font-bold text-xs flex items-center justify-center hover:bg-indigo-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
            aria-label="Open account menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {initials}
          </button>
          {open && (
            <div className="absolute right-0 top-12 w-60 rounded-xl bg-white p-1.5  border border-slate-200 z-50">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <strong className="block text-sm font-semibold text-slate-900">
                  {name}
                </strong>
                <span className="block text-xs text-slate-500 truncate">
                  {user?.email}
                </span>
              </div>
              <button
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                onClick={signOut}
              >
                <Icon icon={LogOut} size={15} /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
