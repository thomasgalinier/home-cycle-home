import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible.tsx";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
} from "@/components/ui/sidebar.tsx";
import {
	Calendar,
	ChevronRight,
	ChevronUp,
	EuroIcon,
	LayoutDashboardIcon,
	LogOut,
	// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
	Map,
	Monitor,
	Moon,
	Sun,
	User,
	Users,
} from "lucide-react";

import { useLocalStorage } from "@/hooks/useLocalStorage.ts";
import { useTheme } from "@/hooks/useTheme.ts";

import { Avatar, AvatarImage } from "@/components/ui/avatar.tsx";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { useLogout } from "@/hooks/comptes/useLogout.ts";
import type { User as UserType } from "@/services/type/auth.ts";
const navigationItems = [
	{
		title: "Dashboard",
		url: "/admin/dashboard",
		icon: LayoutDashboardIcon,
	},
	{
		title: "Comptes",
		icon: Users,
		type: "group",
		children: [
			{
				title: "Liste des comptes",
				url: "/admin/comptes",
				icon: Users,
			},
			{
				title: "Créer un compte",
				url: "/admin/comptes/create",
				icon: User,
			},
		],
	},
	{
		title: "Carte",
		url: "/admin/carte",
		icon: Map,
	},
	{
		title: "Planning",
		url: "/admin/planning",
		icon: Calendar,
	},
	{
		title: "Forfait",
		icon: EuroIcon,
		type: "group",
		children: [
			{
				title: "Liste des forfaits",
				url: "/admin/forfait",
				icon: EuroIcon,
			},
			{
				title: "Créer un forfait",
				url: "/admin/forfait/create",
				icon: EuroIcon,
			},
		],
	},
];

export function AppSidebar({ user }: { user: UserType | undefined }) {
	const [openGroups, setOpenGroups] = useLocalStorage<Record<string, boolean>>(
		"openGroups",
		{},
	);
	const { mutate: mutateLogout } = useLogout();
	const { setTheme } = useTheme();
	const toggleGroup = (title: string) => {
		setOpenGroups((prev) => ({
			...prev,
			[title]: !prev[title],
		}));
	};
	return (
		<Sidebar variant="inset" data-testid='sidebar' className="z-50">
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Menu</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{navigationItems.map((navItem) => {
								return navItem.type === "group" ? (
									<Collapsible
										key={navItem.title}
										className="group/collapsible"
										open={openGroups[navItem.title]}
										onOpenChange={() => toggleGroup(navItem.title)}
									>
										<SidebarMenuItem>
											<CollapsibleTrigger asChild>
												<SidebarMenuButton>
													<navItem.icon />
													<span>{navItem.title}</span>
													<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
												</SidebarMenuButton>
											</CollapsibleTrigger>
											<CollapsibleContent>
												<SidebarMenuSub>
													{navItem.children.map((child) => (
														<SidebarMenuItem key={child.title}>
															<SidebarMenuButton asChild>
																<a href={child.url}>
																	<span>{child.title}</span>
																</a>
															</SidebarMenuButton>
														</SidebarMenuItem>
													))}
												</SidebarMenuSub>
											</CollapsibleContent>
										</SidebarMenuItem>
									</Collapsible>
								) : (
									<SidebarMenuItem key={navItem.title}>
										<SidebarMenuButton asChild>
											<a href={navItem.url}>
												<navItem.icon />
												<span>{navItem.title}</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton>
									<Avatar className="cursor-pointer size-7">
										<AvatarImage
											src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${user?.nom}${user?.prenom}`}
										/>
									</Avatar>
									{user?.prenom}.{user?.nom}
									<ChevronUp className="ml-auto" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>

							<DropdownMenuContent side="top" className="w-56">
								<DropdownMenuItem onClick={() => setTheme("light")}>
									<Sun />
									Mode clair
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setTheme("dark")}>
									<Moon />
									Mode sombre
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setTheme("system")}>
									<Monitor />
									Système
								</DropdownMenuItem>
								<Separator />
								<DropdownMenuItem onClick={() => mutateLogout()}>
									<LogOut />
									Déconnexion
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
