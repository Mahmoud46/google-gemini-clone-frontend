import type { ReactNode } from "react";
import type { IMessage } from "../interfaces/Data.interface";
import { SiGooglegemini } from "react-icons/si";
import MarkdownRenderer from "../libs/MarkdownRenderer";
import { BiCopy, BiDislike, BiLike, BiSolidShareAlt } from "react-icons/bi";
import { FiMoreVertical } from "react-icons/fi";

export default function Message({ message }: { message: IMessage }): ReactNode {
	return (
		<div
			className={`${
				message.participant == "user"
					? "bg-[#282a2c]/80 rounded-3xl max-w-[400px] rounded-tr-none p-4 self-end"
					: "self-start flex gap-4 max-w-[600px]"
			}`}
		>
			{
				<>
					{message.participant == "model" && (
						<div className="text-3xl text-blue-500">
							<SiGooglegemini />
						</div>
					)}
					<div
						className={
							message.participant == "model"
								? "text-white/90 flex flex-col gap-4"
								: ""
						}
					>
						<div className="wrap-break-word">
							<MarkdownRenderer content={message.content} />
						</div>

						{message.participant == "model" && (
							<div className="flex items-center">
								<button className="text-xl cursor-pointer text-white/50 p-2 duration-300 transition-all rounded-full hover:bg-white/20 hover:text-white/80">
									<BiLike />
								</button>
								<button className="text-xl cursor-pointer text-white/50 p-2 duration-300 transition-all rounded-full hover:bg-white/20 hover:text-white/80">
									<BiDislike />
								</button>
								<button className="text-xl cursor-pointer text-white/50 p-2 duration-300 transition-all rounded-full hover:bg-white/20 hover:text-white/80">
									<BiSolidShareAlt />
								</button>
								<button className="text-xl cursor-pointer text-white/50 p-2 duration-300 transition-all rounded-full hover:bg-white/20 hover:text-white/80">
									<BiCopy />
								</button>
								<button className="text-xl cursor-pointer text-white/50 p-2 duration-300 transition-all rounded-full hover:bg-white/20 hover:text-white/80">
									<FiMoreVertical />
								</button>
							</div>
						)}
					</div>
				</>
			}
		</div>
	);
}
