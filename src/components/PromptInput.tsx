import { useContext, useState, type ReactNode } from "react";
import type { IContext } from "../interfaces/Context.interface";
import { Context } from "../context/Context";
import { LuMic, LuPlus, LuSend, LuSquare, LuX } from "react-icons/lu";
import toolsData from "../data/tools.json";
import type { ITool } from "../interfaces/Data.interface";
import Icons from "../libs/Icons";
import Tools from "./Tools";

function ToolSuggestions({ selectedTool }: { selectedTool: ITool }): ReactNode {
	const { chatsController, navigate, send } = useContext(Context) as IContext;
	const [openSuggestions, setOpenSuggestions] = useState<boolean>(true);
	return (
		<>
			{openSuggestions && (
				<div className="bg-[#282a2c]/80 backdrop-blur-sm w-full max-w-[700px] p-2 rounded-2xl flex flex-col gap-2 text-white">
					<div className="flex items-center justify-between">
						<h2 className="flex items-center gap-3 text-white/80 px-4">
							<Icons
								word={selectedTool.name.toLowerCase().split(" ").join("_")}
								className="text-lg"
							/>{" "}
							<p>{selectedTool.name}</p>
						</h2>
						<button
							className="cursor-pointer p-2.5 rounded-full transition-all duration-300 hover:bg-white/10"
							onClick={() => setOpenSuggestions(false)}
						>
							<LuX />
						</button>
					</div>
					<div className="">
						{selectedTool.suggestions.map((sugg, i) => (
							<p
								key={i}
								className={`p-3 ${
									i == selectedTool.suggestions.length - 1 || i == 0
										? ""
										: "border-y border-white/10"
								} cursor-pointer transition-bg duration-300 hover:bg-white/2 hover:border-none hover:rounded-2xl`}
								onClick={() => {
									const chatID = chatsController.startChat(sugg);
									if (chatID) {
										send(
											chatID,
											chatsController.getChat(chatID as string).part_messages
										);
										navigate(`/app/${chatID}`);
									}
								}}
							>
								{sugg}
							</p>
						))}
					</div>
				</div>
			)}
		</>
	);
}

export default function PromptInput({ chatID }: { chatID?: string }) {
	const { isMenuOpen, chatsController, navigate, send, isResponseLoading } =
		useContext(Context) as IContext;
	const [prompt, setPrompt] = useState<string>("");
	const [selectedTool, setSelectedTool] = useState<ITool | null>(null);

	return (
		<footer
			className={`p-4 sticky bottom-0 transition-all duration-300 z-20 bg-[#1b1c1d]/50 backdrop-blur-sm ${
				isMenuOpen ? "md:pl-[310px]" : "md:pl-20"
			} flex justify-center items-center w-full flex-col gap-4 ${
				isResponseLoading ? "pointer-events-none" : ""
			}`}
		>
			<div className="relative flex flex-col max-w-[700px] w-full border-white/50 border rounded-3xl p-2 shadow-[0_0_3px_rgba(0,0,0,0.4)] shadow-white/45">
				<input
					type="text"
					placeholder="Ask Gemini"
					className="outline-0 text-white text-lg p-2 pb-4"
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
				/>

				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<button
							className={`text-lg text-white/80 cursor-pointer transition-all duration-300 hover:bg-white/10 p-2.5 rounded-full flex-none`}
						>
							<LuPlus className="flex-none" />
						</button>
						<Tools
							selectedTool={selectedTool}
							setSelectedTool={setSelectedTool}
						/>
					</div>
					<div className="flex items-center gap-2">
						<div
							className={`text-sm text-white/80 cursor-pointer transition-all duration-300 hover:bg-white/10 pr-1 rounded-full flex-none`}
						>
							<select className="p-2.5 cursor-pointer outline-0">
								<option value="2.5 Flash">2.0 Flash</option>
							</select>
						</div>
						{prompt.trim() == "" && !isResponseLoading && (
							<button
								className={`text-lg text-white/80 cursor-pointer transition-all duration-300 hover:bg-white/10 p-2.5 rounded-full flex-none flex items-center gap-2`}
							>
								<LuMic className="flex-none" />
							</button>
						)}
						{prompt.trim() != "" && !isResponseLoading && (
							<button
								className={`text-lg text-white cursor-pointer transition-all duration-300 bg-white/10 hover:rotate-45 p-2.5 rounded-full flex-none flex items-center gap-2`}
								onClick={() => {
									if (!chatID) {
										const chatID = chatsController.startChat(prompt);
										send(
											chatID,
											chatsController.getChat(chatID as string).part_messages
										);
										navigate(`/app/${chatID}`);
									} else {
										chatsController.createMessage(chatID, prompt, "user");
										send(
											chatID,
											chatsController.getChat(chatID as string).part_messages
										);
										navigate(`/app/${chatID}`);
									}

									setPrompt("");
								}}
							>
								<LuSend className="flex-none" />
							</button>
						)}
						{isResponseLoading && (
							<button
								className={`text-lg text-[#a8c7fa] bg-[#a8c7fa]/20 cursor-pointer p-2.5 rounded-full flex-none flex items-center gap-2`}
							>
								<LuSquare fill="currentColor" className="flex-none" />
							</button>
						)}
					</div>
				</div>
			</div>

			{chatID && (
				<p className="text-xs text-white/80">
					Gemini can make mistakes, so double-check it
				</p>
			)}

			{!chatID && !selectedTool && (
				<div className="flex items-center gap-2">
					{toolsData.tools.map((tool, i) => (
						<div
							key={i}
							className="transition-all duration-300 bg-white/10 p-3 rounded-full cursor-pointer text-white/80 text-sm hover:bg-white/20"
							onClick={() => setSelectedTool(tool)}
						>
							{tool.name}
						</div>
					))}
				</div>
			)}

			{!chatID && selectedTool && (
				<ToolSuggestions selectedTool={selectedTool} />
			)}
		</footer>
	);
}
