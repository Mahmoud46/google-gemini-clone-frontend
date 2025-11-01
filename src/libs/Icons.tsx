import type { ReactNode } from "react";
import {
	LuAppWindow,
	LuBookOpenText,
	LuBrain,
	LuCode,
	LuImages,
	LuText,
} from "react-icons/lu";

export default function Icons({
	word,
	className = "",
}: {
	word: string;
	className?: string;
}): ReactNode {
	switch (word) {
		case "deep_research":
			return <LuBrain className={className} />;
		case "canvas":
			return <LuAppWindow className={className} />;
		case "build":
			return <LuCode className={className} />;
		case "write":
			return <LuText className={className} />;
		case "guided_learning":
		case "learn":
			return <LuBookOpenText className={className} />;

		default:
			return <LuImages className={className} />;
	}
}
