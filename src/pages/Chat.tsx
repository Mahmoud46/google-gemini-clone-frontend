import { useContext, type ReactNode } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../context/Context";
import type { IContext } from "../interfaces/Context.interface";
import PromptInput from "../components/PromptInput";
import MarkdownRenderer from "../libs/MarkdownRenderer";
import Message from "../components/Message";
import { SiGooglegemini } from "react-icons/si";
import { LuLoaderCircle } from "react-icons/lu";

export default function Chat(): ReactNode {
	const { id } = useParams();
	const { chatsController, isMenuOpen, modelReponse, isResponseLoading } =
		useContext(Context) as IContext;
	return (
		<>
			{chatsController.includes(id as string) && (
				<>
					<section
						className={`flex pb-4 pr-8 transition-all duration-300 ${
							isMenuOpen ? "pl-[310px]" : "pl-20"
						} text-white`}
					>
						<div className="flex w-full">
							<div className="flex items-center justify-center w-full">
								{chatsController.includes(id as string) && (
									<div className="pt-20 max-w-[700px] flex flex-col w-full gap-8">
										{chatsController
											.getChat(id as string)
											.messages.map((message, i) => (
												<Message message={message} key={i} />
											))}
										{isResponseLoading && (
											<div className="flex gap-4 items-start">
												<div className="relative">
													<LuLoaderCircle
														className="text-5xl absolute top-1/2 left-1/2 -translate-1/2 animate-spin text-cyan-400"
														strokeWidth={1}
													/>
													<div className="text-2xl animate-pulse text-blue-500">
														<SiGooglegemini />
													</div>
												</div>
												<div className="">
													<MarkdownRenderer content={modelReponse} />
												</div>
											</div>
										)}
									</div>
								)}
							</div>
						</div>
					</section>
					<PromptInput chatID={id as string} />
				</>
			)}
		</>
	);
}
