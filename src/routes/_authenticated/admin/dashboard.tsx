import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button.tsx";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Button onClick={() => toast.success("toto")}>toast test</Button>;
}
