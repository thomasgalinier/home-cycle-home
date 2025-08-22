import { createFileRoute } from "@tanstack/react-router";
import { useMe } from "@/hooks/comptes/useMe.ts";

export const Route = createFileRoute("/_authenticated/")({
	component: App,
});

function App() {
	const { data } = useMe();
	console.log(data);
	return <div className="text-center bg-violet-600">toto</div>;
}
