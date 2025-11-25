import { useContext, type ReactNode } from "react";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import {
	LuMenu,
	LuMessageSquareDashed,
	LuSearch,
	LuSettings,
	LuSquarePen,
} from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
import ChatCard from "./ChatCard";

function MenuSearch(): ReactNode {
	const { isMenuOpen, setIsMenuOpen, navigate } = useContext(
		Context
	) as IContext;

	return (
		<div className="text-gray-300/80 flex justify-between items-center">
			<button
				className="text-lg cursor-pointer transition-all duration-300 hover:bg-white/10 p-2.5 rounded-full"
				onClick={() => setIsMenuOpen((prev) => !prev)}
			>
				<LuMenu />
			</button>
			<button
				className={`text-lg cursor-pointer transition-all duration-300 hover:bg-white/10 p-2.5 rounded-full  ${
					isMenuOpen ? "opacity-100" : "opacity-0"
				} ${location.pathname == "/app/search" ? "hidden" : ""}`}
				onClick={() => navigate("/app/search")}
			>
				<LuSearch />
			</button>
		</div>
	);
}

function NewChatButton(): ReactNode {
	const { isMenuOpen } = useContext(Context) as IContext;
	const location = useLocation();

	return (
		<div className="text-gray-300/80 flex items-center justify-between gap-4">
			<Link
				to={"/"}
				className={`text-lg cursor-pointer rounded-full flex items-center gap-1.5 flex-1 transition-all duration-300 ${
					isMenuOpen ? "hover:bg-white/10" : "px-0"
				} ${location.pathname == "/" ? "opacity-50 pointer-events-none" : ""}`}
			>
				<div
					className={`flex-none p-2.5 ${
						isMenuOpen
							? ""
							: "hover:bg-white/10 rounded-full transition-all duration-300"
					}`}
				>
					<LuSquarePen />
				</div>
				<p
					className={`text-base flex-none transition-all duration-300  ${
						isMenuOpen ? "opacity-100" : "opacity-0"
					}`}
				>
					New Chat
				</p>
			</Link>
			<button
				className={`text-lg cursor-pointer transition-all duration-300 hover:bg-white/10 p-2.5 rounded-full ${
					isMenuOpen ? "opacity-100" : "opacity-0"
				} flex-none border border-white/10`}
			>
				<LuMessageSquareDashed className="flex-none" />
			</button>
		</div>
	);
}

function ChatsList(): ReactNode {
	const { chatsController, isMenuOpen } = useContext(Context) as IContext;

	return (
		<div
			className={`flex flex-col transition-all duration-300 ${
				isMenuOpen ? "opacity-100" : "opacity-0"
			}`}
		>
			<h2 className="text-white/50 p-2.5">Recent</h2>
			<div className="">
				{chatsController.chats.map((chat, i) => (
					<ChatCard chat={chat} key={i} />
				))}
			</div>
		</div>
	);
}

export default function Sidebar(): ReactNode {
	const { isMenuOpen } = useContext(Context) as IContext;

	return (
		<div
			className={`fixed top-0 z-30 bg-[#282a2c]/40 backdrop-blur-sm p-0 md:p-4 h-dvh flex flex-col gap-8 ${
				isMenuOpen ? "p-4 w-[300px]" : "w-[0px] md:w-[70px]"
			} overflow-hidden transition-all duration-300 flex flex-col`}
		>
			<MenuSearch />
			<NewChatButton />
			<div className="flex-1">
				<ChatsList />
			</div>
			<div className="text-gray-300/80 flex justify-between items-center">
				<button
					className={`text-lg cursor-pointer rounded-full flex items-center gap-1.5 flex-1 transition-all duration-300 ${
						isMenuOpen ? "hover:bg-white/10" : "px-0"
					}`}
				>
					<div
						className={`flex-none p-2.5 ${
							isMenuOpen
								? ""
								: "hover:bg-white/10 rounded-full transition-all duration-300"
						}`}
					>
						<LuSettings />
					</div>
					<p
						className={`text-base flex-none transition-all duration-300  ${
							isMenuOpen ? "opacity-100" : "opacity-0"
						}`}
					>
						Setting & help
					</p>
				</button>
			</div>
		</div>
	);
}
