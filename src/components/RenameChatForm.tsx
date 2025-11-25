import { useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";

export default function RenameChatForm(): ReactNode {
	const { renamedChat, setRenamedChat, chatsController } = useContext(
		Context
	) as IContext;
	const [chatTitleInput, setChatTitleInput] = useState<string>("");

	const formRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (renamedChat) setChatTitleInput(renamedChat.title);
	}, [renamedChat]);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setRenamedChat(null);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<>
			{renamedChat && (
				<div className="fixed w-full h-full bg-black/10 backdrop-blur-sm top-0 z-50 flex items-center justify-center">
					<div
						className="bg-[#282a2c]/40 text-white p-4 rounded-2xl min-w-[330px] md:min-w-[450px] flex flex-col gap-8"
						ref={formRef}
					>
						<h1 className="text-2xl">Rename this chat</h1>
						<input
							type="text"
							value={chatTitleInput}
							onChange={(e) => setChatTitleInput(e.target.value)}
							required
							className="p-2.5 border-white/50  rounded-lg transition-all border-2 duration-300 hover:border-white/80 text-lg outline-0 focus:border-[#a8c7fa]"
						/>
						<div className="self-end flex gap-4 items-center">
							<button
								className="cursor-pointer transition-all duration-300 text-[#a8c7fa] hover:bg-[#a8c7fa]/20 p-2.5 text-sm rounded-full"
								onClick={() => setRenamedChat(null)}
							>
								Cancel
							</button>
							<button
								className={`cursor-pointer transition-all duration-300 text-[#a8c7fa] hover:bg-[#a8c7fa]/20 p-2.5 text-sm rounded-full ${
									renamedChat.title == chatTitleInput
										? "text-white/50 pointer-events-none"
										: ""
								}`}
								onClick={() => {
									chatsController.update({
										...renamedChat,
										title: chatTitleInput,
									});

									setRenamedChat(null);
								}}
							>
								Rename
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
