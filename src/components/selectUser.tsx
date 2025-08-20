
import type { User } from "@/services/type/auth";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Avatar, AvatarImage } from "./ui/avatar";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

type SelectUserProps = {
    field?: AnyFieldApi;
    users: User[];
	value?: string;
	setValue?: (value: string) => void;
	isLoading?: boolean;
};
export default function SelectUser({field, users, value, setValue, isLoading}: SelectUserProps) {

	return (
		<Select
			value={field?.state.value || value}
			onValueChange={(value) => {field ? field.handleChange(value) : setValue?.(value)}}
		>
			<SelectTrigger className="w-full">
				<SelectValue placeholder="Selectionne un utilisateur" />
			</SelectTrigger>
			<SelectContent className="w-full z-[10000]">
				{!isLoading? users.map((user) => (
					<SelectItem key={user.id} value={user.id}>
                        <Avatar className="w-6 h-6">
                            <AvatarImage
                                src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${user?.nom}${user?.prenom}`}
                            />
                        </Avatar>
						{user.prenom} {user.nom}
					</SelectItem>
				)): null}
			</SelectContent>
		</Select>
	);
}
