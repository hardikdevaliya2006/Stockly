import { createElement } from "react";
import {
  ArrowRight,
  BadgeAlert,
  Boxes,
  ChevronLeft,
  ChevronRight,
  CircleX,
  DollarSign,
  Eye,
  EyeOff,
  ImageOff,
  LayoutGrid,
  List,
  LoaderCircle,
  LogOut,
  Package,
  Pencil,
  Plus,
  Search,
  Trash2,
  TriangleAlert,
  Upload,
  X,
} from "lucide";

export {
  ArrowRight,
  BadgeAlert,
  Boxes,
  ChevronLeft,
  ChevronRight,
  CircleX,
  DollarSign,
  Eye,
  EyeOff,
  ImageOff,
  LayoutGrid,
  List,
  LoaderCircle,
  LogOut,
  Package,
  Pencil,
  Plus,
  Search,
  Trash2,
  TriangleAlert,
  Upload,
  X,
};

// The installed Lucide package exposes SVG node definitions. This tiny React adapter
// keeps icons as accessible React components without adding another UI dependency.
export default function Icon({
  icon,
  size = 18,
  strokeWidth = 2,
  className = "",
  ...props
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {icon.map(([tag, attributes], index) =>
        createElement(tag, { ...attributes, key: index }),
      )}
    </svg>
  );
}
