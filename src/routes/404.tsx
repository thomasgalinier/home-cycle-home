import { Button } from "@/components/ui/button";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/404")({
  component: NotFoundPage,
});

function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 w-full">
      <div className="text-center max-w-xl">
        <div className="text-6xl font-extrabold tracking-tight text-gray-900">404</div>
        <p className="mt-3 text-lg text-gray-600">Page introuvable</p>
        <p className="mt-1 text-sm text-gray-500">La page que vous cherchez n'existe pas ou a été déplacée.</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button variant="outline" asChild>
            <Link to="/">Accueil</Link>
          </Button>
          <Button>
            <Link to="/admin/dashboard">Tableau de bord</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
