import type { NavigateFunction } from "react-router-dom";
import type { Chats } from "../classes/Chats.class";
import type { IChat, IPartMessage } from "./Data.interface";

export interface IContext {
	chatsController: Chats;
	isMenuOpen: boolean;
	setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
	navigate: NavigateFunction;
	renamedChat: IChat | null;
	setRenamedChat: React.Dispatch<React.SetStateAction<IChat | null>>;
	modelReponse: string;
	setModelReponse: React.Dispatch<React.SetStateAction<string>>;
	send: (chatID: string, chatHistory: IPartMessage[]) => Promise<void>;
	isResponseLoading: boolean;

	update: boolean;
}
