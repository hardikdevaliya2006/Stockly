import Icon, { LoaderCircle } from "./Icon";

export default function LoadingSpinner({ label = "Loading", size = 18, className = "" }) {
  return (
    <span className={`inline-flex items-center justify-center text-indigo-600 ${className}`} role="status">
      <Icon icon={LoaderCircle} size={size} className="animate-spin" />
      <span className="sr-only">{label}</span>
    </span>
  );
}
