import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { DialogUpdateUser } from "@/components/Comptes/DialogUpdateUser.tsx";
// import { useComptes } from "@/hooks/useComptes.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Dialog, DialogTrigger } from "@/components/ui/dialog.tsx";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table.tsx";
import { useAllUser } from "@/hooks/comptes/useAllUser.ts";
import { useUserDelete } from "@/hooks/comptes/useUserDelete.ts";
import type { User } from "@/services/type/auth.ts";
import { useQueryClient } from "@tanstack/react-query";
import { flexRender, useReactTable } from "@tanstack/react-table";
import { type ColumnDef, getCoreRowModel } from "@tanstack/table-core";

export const Route = createFileRoute("/_authenticated/comptes/")({
	component: Comptes,
});

function Comptes() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { data: dataUser } = useAllUser();
	const { mutate: deleteUser } = useUserDelete(queryClient);
	const columns: ColumnDef<User>[] = [
		{
			id: "select",
			header: "select",
			cell: ({ row }) => {
				const user = row.original;

				return (
					<Checkbox
						disabled={user.role === "SUPER_ADMIN"}
						checked={row.getIsSelected()}
						onCheckedChange={() => {
							row.toggleSelected();
						}}
						className="cursor-pointer"
						aria-label="select row"
					/>
				);
			},
		},
		{
			accessorKey: "nom",
			header: "Nom",
		},
		{
			accessorKey: "prenom",
			header: "Prénom",
		},
		{
			accessorKey: "email",
			header: "Email",
		},
		{
			accessorKey: "telephone",
			header: "Téléphone",
		},
		{
			accessorKey: "role",
			header: "Rôle",
		},
		{
			id: "actions",
			header: "Actions",
			cell: ({ row }) => {
				const user = row.original;
				return (
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="secondary">Modifier</Button>
						</DialogTrigger>
						<DialogUpdateUser user={user} />
					</Dialog>
				);
			},
		},
	];
	const table = useReactTable({
		data: Array.isArray(dataUser) ? dataUser : [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	});
	const selectedRows = table
		.getSelectedRowModel()
		.flatRows.map((row) => row.original);
	const handleDelete = () => {
		// biome-ignore lint/complexity/noForEach: <explanation>
		selectedRows.forEach((user) => {
			deleteUser(user.id);
		});
	};
	return (
		<div className="p-2">
			<div className="flex gap-2 pb-2">
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button variant="ghost" disabled={!selectedRows.length}>
							Supprimer
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								Êtes-vous sûr de vouloir supprimer ces comptes?
							</AlertDialogTitle>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Annuler</AlertDialogCancel>
							<AlertDialogAction onClick={handleDelete}>
								Supprimer
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
				<Button onClick={() => navigate({ to: "/comptes/create" })}>
					Créer un comptes
				</Button>
			</div>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => {
						return (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: header.column.columnDef.header?.toString()}
									</TableHead>
								))}
							</TableRow>
						);
					})}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								Aucun compte trouvé
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
