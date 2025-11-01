export interface ITool {
	name: string;
	acronym: string;
	suggestions: string[];
}

export interface IChat {
	id: string;
	title: string;

	updated_at?: string;
	created_at: string;

	messages: IMessage[];
	part_messages: IPartMessage[];
}

export interface IMessage {
	id: string;
	updated_at?: string;
	created_at: string;

	content: string;
	participant: TParticipant;
}

export interface IPartMessage {
	role: TParticipant;
	parts: { text: string }[];
}

export type TParticipant = "user" | "model";
