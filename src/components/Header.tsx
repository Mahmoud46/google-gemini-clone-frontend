import { useContext } from "react";
import { MdMenu } from "react-icons/md";
import { SiGooglegemini } from "react-icons/si";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import { LuUser } from "react-icons/lu";

export default function Header() {
	const { isMenuOpen } = useContext(Context) as IContext;

	return (
		<header
			className={`text-white/50 p-4 sticky top-0 transition-all duration-300 z-20 bg-[#1b1c1d]/50 backdrop-blur-sm ${
				isMenuOpen ? "pl-[310px]" : "pl-20"
			}`}
		>
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-4 cursor-pointer p-1">
					<button className="text-xl cursor-pointer transition-all duration-300 hover:bg-white/10 p-2 rounded-full flex lg:hidden">
						<MdMenu />
					</button>
					<Link to={"/"} className="flex items-center gap-2 text-xl">
						<SiGooglegemini className="text-2xl" />
						<p>Gemini</p>
					</Link>
				</div>

				<div className="text-xl bg-white/10 p-2.5 rounded-full cursor-pointer">
					<LuUser />
				</div>
			</div>
		</header>
	);
}
