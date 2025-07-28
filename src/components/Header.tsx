import { useLocation } from "@tanstack/react-router";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx";
import { SidebarTrigger } from "@/components/ui/sidebar.tsx";

export default function Header() {
	const location = useLocation();
	const pathSegments = location.pathname.split("/").filter(Boolean);
	console.log("pathSegments", pathSegments);
	return (
		<header className="flex items-center pb-2 gap-2">
			<SidebarTrigger className="mr-2" />
			<Breadcrumb>
				<BreadcrumbList>
					{pathSegments.map((segment, index) => (
						<BreadcrumbItem key={segment}>
							<BreadcrumbLink
								href={`/${pathSegments.slice(0, index + 1).join("/")}`}
							>
								{segment}
							</BreadcrumbLink>
							{index < pathSegments.length - 1 && <BreadcrumbSeparator />}
						</BreadcrumbItem>
					))}
				</BreadcrumbList>
			</Breadcrumb>
		</header>
	);
}
