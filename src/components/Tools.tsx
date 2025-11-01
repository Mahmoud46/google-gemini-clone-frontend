import { useEffect, useRef, useState, type ReactNode } from "react";
import type { ITool } from "../interfaces/Data.interface";
import toolsData from "../data/tools.json";
import Icons from "../libs/Icons";
import { LuCircleCheck, LuSettings2, LuX } from "react-icons/lu";

function ToolsMenu({
	setOpenMenu,
	selectedTool,
	setSelectedTool,
	menuRef,
}: {
	setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
	selectedTool: ITool | null;
	setSelectedTool: React.Dispatch<React.SetStateAction<ITool | null>>;
	menuRef: React.RefObject<HTMLDivElement | null>;
}): ReactNode {
	return (
		<div
			className="absolute z-40 py-2 bg-[#282a2c]/40 backdrop-blur-xl top-full left-0 rounded-2xl overflow-hidden w-max mt-2"
			ref={menuRef}
		>
			{toolsData.tools.map((tool, i) => (
				<div
					key={i}
					className="px-4 w-[250px] py-2 flex items-center justify-between cursor-pointer transition-all duration-300 hover:bg-white/10 text-white/80"
					onClick={() => {
						setSelectedTool(tool);
						setOpenMenu(false);
					}}
				>
					<div className="flex items-center gap-4 ">
						<Icons
							className="text-lg"
							word={tool.name.toLowerCase().split(" ").join("_")}
						/>
						<span className="text-sm">{tool.name}</span>
					</div>

					{selectedTool?.name == tool.name && (
						<LuCircleCheck className="text-[#4e8ff8] text-base" />
					)}
				</div>
			))}
		</div>
	);
}

export default function Tools({
	selectedTool,
	setSelectedTool,
}: {
	selectedTool: ITool | null;
	setSelectedTool: React.Dispatch<React.SetStateAction<ITool | null>>;
}): ReactNode {
	const [openMenu, setOpenMenu] = useState<boolean>(false);

	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setOpenMenu(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="relative flex gap-1 items-center">
			<button
				className={`text-lg text-white/80 cursor-pointer transition-all duration-300 hover:bg-white/10 p-2.5 rounded-full flex-none flex items-center gap-2 ${
					openMenu ? "bg-white/10" : ""
				}`}
				onClick={() => setOpenMenu((prev) => !prev)}
			>
				<LuSettings2 className="flex-none" />
				{!selectedTool && <p className="text-sm">Tools</p>}
			</button>

			{selectedTool && (
				<div
					className="text-sm text-[#a8c7fa] flex items-center gap-4 transition-all duration-300 hover:bg-[#a8c7fa]/5 cursor-pointer p-2.5 rounded-full px-4"
					onClick={() => setSelectedTool(null)}
				>
					<div className="flex gap-3 items-center">
						<Icons
							className="text-lg"
							word={selectedTool.acronym.toLowerCase().split(" ").join("_")}
						/>
						<p>{selectedTool.acronym}</p>
					</div>
					<LuX className="text-base" strokeWidth={3} />
				</div>
			)}

			{openMenu && (
				<ToolsMenu
					setOpenMenu={setOpenMenu}
					selectedTool={selectedTool}
					setSelectedTool={setSelectedTool}
					menuRef={menuRef}
				/>
			)}
		</div>
	);
}
