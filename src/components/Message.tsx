import type { ReactNode } from "react";
import type { IMessage } from "../interfaces/Data.interface";
import { SiGooglegemini } from "react-icons/si";
import { BiCopy, BiDislike, BiLike, BiSolidShareAlt } from "react-icons/bi";
import { FiMoreVertical } from "react-icons/fi";
import MarkdownAdvanced from "../libs/MarkdownRenderer";

function UserMessage({ message }: { message: IMessage }): ReactNode {
	return (
		<div className="bg-[#282a2c]/80 rounded-3xl max-w-[400px] rounded-tr-none p-4 self-end">
			{message.content}
		</div>
	);
}

function ModelMessage({ message }: { message: IMessage }): ReactNode {
	return (
		<div className="self-start flex gap-4 max-w-[600px]">
			<div className="text-3xl text-blue-500">
				<SiGooglegemini />
			</div>
			<div className="text-white/90 flex flex-col gap-4">
				<div className={`wrap-break-word max-w-[600px]`}>
					<MarkdownAdvanced content={message.content} />
				</div>
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
			</div>
		</div>
	);
}

export default function Message({ message }: { message: IMessage }): ReactNode {
	switch (message.participant) {
		case "model":
			return <ModelMessage message={message} />;

		default:
			return <UserMessage message={message} />;
	}
}
