import { useContext } from "react";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import PromptInput from "../components/PromptInput";

export default function Home() {
	const { isMenuOpen } = useContext(Context) as IContext;

	return (
		<>
			<section
				className={`flex pb-4 pr-8 transition-all duration-300 ${
					isMenuOpen ? "md:pl-[310px]" : "md:pl-20"
				} text-white`}
			>
				<div className="flex w-full">
					<div className="flex items-center justify-center w-full">
						<div className="pt-20 max-w-[650px]">
							<p className="text-3xl text-center font-medium bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
								Hello, Mahmoud
							</p>
						</div>
					</div>
				</div>
			</section>

			<PromptInput />
		</>
	);
}
