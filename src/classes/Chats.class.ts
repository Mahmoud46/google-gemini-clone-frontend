import { nanoid } from "nanoid";
import type {
	IChat,
	IMessage,
	IPartMessage,
	TParticipant,
} from "../interfaces/Data.interface";

export class Chats {
	chats: IChat[];
	protected indexedChats: Record<string, IChat>;
	protected indexedIDs: Record<string, number>;
	protected setUpdate: React.Dispatch<React.SetStateAction<boolean>>;

	constructor() {
		this.chats = [];
		this.indexedChats = {};
		this.indexedIDs = {};
		this.setUpdate = () => {};
	}

	init(setUpdate: React.Dispatch<React.SetStateAction<boolean>>) {
		this.setUpdate = setUpdate;
	}

	protected getIndexedChats(): Record<string, IChat> {
		const indexedChats: Record<string, IChat> = {};

		for (const chat of this.chats) indexedChats[chat.id] = chat;

		return indexedChats;
	}

	protected getIndexedIDs(): Record<string, number> {
		const indexedIDs: Record<string, number> = {};

		for (let i = 0; i < this.chats.length; ++i)
			indexedIDs[this.chats[i].id] = i;

		return indexedIDs;
	}

	startChat(prompt: string) {
		const message: IMessage = {
			id: nanoid(),
			created_at: new Date().toISOString(),
			participant: "user",
			content: prompt,
		};

		const partMessage: IPartMessage = {
			role: "user",
			parts: [{ text: prompt }],
		};

		const chat: IChat = {
			id: nanoid(),
			title: prompt.slice(0, 50),
			created_at: new Date().toISOString(),
			messages: [message],
			part_messages: [partMessage],
		};

		chatsController.create(chat);

		return chat.id;
	}

	includes(chatID: string): boolean {
		return chatID in this.indexedChats;
	}

	getChat(chatID: string): IChat {
		return this.indexedChats[chatID];
	}

	// Chat
	create(chat: IChat) {
		const chats: IChat[] = [chat, ...this.chats];
		this.updateChats(chats);
	}

	update(chat: IChat) {
		const chats: IChat[] = [...this.chats];
		chats[this.indexedIDs[chat.id]] = {
			...chats[this.indexedIDs[chat.id]],
			...chat,
		};
		this.updateChats(chats);
	}

	delete(chatID: string) {
		const chats = [...this.chats].filter((chat) => chat.id != chatID);
		this.updateChats(chats);
	}

	// Messages
	createMessage(chatID: string, content: string, role: TParticipant) {
		const message: IMessage = {
			id: nanoid(),
			created_at: new Date().toISOString(),
			participant: role,
			content: content,
		};

		const partMessage: IPartMessage = {
			role: role,
			parts: [{ text: content }],
		};

		const chats: IChat[] = [...this.chats];
		chats[this.indexedIDs[chatID]] = {
			...chats[this.indexedIDs[chatID]],
			messages: [...chats[this.indexedIDs[chatID]].messages, message],
			part_messages: [
				...chats[this.indexedIDs[chatID]].part_messages,
				partMessage,
			],
		};

		this.updateChats(chats);
	}

	updateChats(chats: IChat[]) {
		this.chats = chats;
		this.indexedChats = this.getIndexedChats();
		this.indexedIDs = this.getIndexedIDs();

		this.setUpdate((prev) => !prev);
	}
}

export const chatsController = new Chats();
