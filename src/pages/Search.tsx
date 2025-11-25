import { useContext, useEffect, useState, type ReactNode } from "react";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import { LuSearch, LuX } from "react-icons/lu";
import type { IChat } from "../interfaces/Data.interface";

export default function Search(): ReactNode {
	const { isMenuOpen, chatsController, navigate } = useContext(
		Context
	) as IContext;
	const [search, setSearch] = useState<string>();
	const [searchedChats, setSearchedChats] = useState<IChat[]>([]);

	useEffect(() => {
		setSearchedChats(
			chatsController.chats.filter((chat) =>
				search?.trim()
					? chat.title.toLowerCase().includes(search.toLowerCase()) ||
					  chat.messages[0].content
							.toLowerCase()
							.includes(search.toLowerCase())
					: chat
			)
		);
	}, [chatsController.chats, search]);

	return (
		<section
			className={`flex pb-4 pr-8 transition-all duration-300 ${
				isMenuOpen ? "md:pl-[310px]" : "md:pl-20"
			} text-white`}
		>
			<div className="flex w-full">
				<div className="flex items-center justify-center w-full">
					<div className="max-w-[300px] md:max-w-[650px] flex flex-col gap-8">
						<h1 className="text-3xl">Search</h1>
						<div className="flex items-center border-white/50 border gap-3 pl-2.5 rounded-full max-w-[300px] md:w-[600px]">
							<LuSearch className="text-lg opacity-80" />
							<input
								value={search}
								type="text"
								placeholder="Search for chats"
								className="outline-0 p-2.5 text-base font-light flex-1"
								onChange={(e) => setSearch(e.target.value)}
							/>
							{search?.trim() && (
								<button
									className="mr-1 p-2.5 cursor-pointer transition-all duration-300 hover:bg-white/10 rounded-full"
									onClick={() => setSearch("")}
								>
									<LuX className="text-lg" />
								</button>
							)}
						</div>
						<div className="flex flex-col gap-2">
							<h2 className="p-2 text-lg">
								{search
									? `${searchedChats.length} results for "${search}"`
									: "Recent"}
							</h2>
							{searchedChats.map((chat, i) => (
								<div
									key={i}
									className="flex justify-between items-center p-2.5 py-3 cursor-pointer transition-all duration-300 hover:bg-white/10 border-b border-b-white/50"
									onClick={() => navigate(`/app/${chat.id}`)}
								>
									<p>{chat.title}</p>
									<p className="text-xs text-white/80">
										{new Date(chat.created_at).toLocaleDateString("en-US", {
											year: "numeric",
											month: "short",
											day: "numeric",
										})}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
