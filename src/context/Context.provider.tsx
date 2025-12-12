import { useEffect, useState, type ReactNode } from "react";
import type { IContext } from "../interfaces/Context.interface";
import { Context } from "./Context";
import { chatsController } from "../classes/Chats.class";
import { useNavigate } from "react-router-dom";
import type { IChat } from "../interfaces/Data.interface";
import runChat from "../config/gemini.config";
import type { IPartMessage } from "../interfaces/Data.interface";

export default function ContextProvider({
	children,
}: {
	children: ReactNode;
}): ReactNode {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const navigate = useNavigate();
	const [update, setUpdate] = useState<boolean>(false);
	const [renamedChat, setRenamedChat] = useState<IChat | null>(null);
	const [modelReponse, setModelReponse] = useState<string>("");
	const [isResponseLoading, setIsResponseLoading] = useState<boolean>(false);

	const send = async (
		chatID: string,
		chatHistory: IPartMessage[]
	): Promise<void> => {
		let response = "";
		setIsResponseLoading(true);
		try {
			for await (const chunk of runChat(chatHistory)) {
				response += chunk;
				setModelReponse(response);
			}
		} catch (error) {
			response += "\n";
			response += "\n";

			if (error instanceof Error && error.message.includes("429")) {
				const err = JSON.parse(error.message);
				if (err.error && err.error.message) {
					const errRecursive = JSON.parse(err.error.message);
					response += errRecursive.error.message;
				}
			} else {
				response += "## The model is overloaded. Please try again later.";
			}

			setModelReponse(response);
		}

		chatsController.createMessage(chatID, response, "model");
		setModelReponse("");
		setIsResponseLoading(false);
	};

	useEffect(() => {
		chatsController.init(setUpdate);
	}, []);

	const contextValue: IContext = {
		chatsController,
		isMenuOpen,
		setIsMenuOpen,
		navigate,
		renamedChat,
		setRenamedChat,
		modelReponse,
		setModelReponse,
		send,
		isResponseLoading,

		update,
	};
	return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}
