import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import LoadingSpinner from "./LoadingSpinner";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <LoadingSpinner label="Checking authentication" size={28} />
      </div>
    );
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
