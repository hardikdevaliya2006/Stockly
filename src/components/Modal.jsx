import Icon, { X } from "./Icon";

export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      onMouseDown={onClose}
    >
      <div
        className="relative bg-white rounded-2xl  border border-slate-200 max-w-md w-full p-6 sm:p-7"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-4 top-4 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          onClick={onClose}
          aria-label="Close modal"
        >
          <Icon icon={X} size={18} />
        </button>
        <h2 className="font-heading font-bold text-xl text-slate-900 mb-2">{title}</h2>
        {children}
      </div>
    </div>
  );
}
