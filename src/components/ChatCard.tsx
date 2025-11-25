import { Link, useLocation } from "react-router-dom";
import type { IChat } from "../interfaces/Data.interface";
import { useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { LuPenLine, LuTrash } from "react-icons/lu";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";

export default function ChatCard({ chat }: { chat: IChat }): ReactNode {
	const { chatsController, navigate, setRenamedChat } = useContext(
		Context
	) as IContext;
	const [optionsOpen, setOptionsMenu] = useState<boolean>(false);
	const location = useLocation();

	const optionsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				optionsRef.current &&
				!optionsRef.current.contains(event.target as Node)
			) {
				setOptionsMenu(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div
			className={`flex p-1.5 cursor-pointer transition-all duration-300 ${
				optionsOpen ? "" : "hover:bg-white/10"
			} text-white/80 text-sm rounded-full items-center group relative ${
				location.pathname.includes(chat.id)
					? "text-[#a8c7fa] bg-[#a8c7fa]/20"
					: ""
			}`}
		>
			<Link to={`/app/${chat.id}`} className="line-clamp-1 flex-1 p-1">
				{chat.title}
			</Link>
			<div
				className={`flex-none text-lg transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100 ${
					optionsOpen ? "bg-white/15 opacity-100" : "hover:bg-white/15"
				} rounded-full p-1`}
				onClick={() => setOptionsMenu((prev) => !prev)}
			>
				<FiMoreVertical />
			</div>
			{optionsOpen && (
				<div
					className="absolute bg-black/50 backdrop-blur-lg top-full right-0 z-50 rounded-xl overflow-hidden py-2"
					ref={optionsRef}
				>
					<div
						className="flex p-2.5 items-center gap-2.5 pr-6 hover:bg-white/10"
						onClick={() => {
							setRenamedChat(chat);
							setOptionsMenu(false);
						}}
					>
						<LuPenLine className="tex-lg" />
						<p>Rename</p>
					</div>
					<div
						className="flex p-2.5 items-center gap-2.5 pr-6 hover:bg-white/10"
						onClick={() => {
							chatsController.delete(chat.id);
							setOptionsMenu(false);
							if (location.pathname.includes(chat.id)) navigate("/");
						}}
					>
						<LuTrash className="tex-lg" />
						<p>Delete</p>
					</div>
				</div>
			)}
		</div>
	);
}
