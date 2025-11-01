import React, { type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";

interface MarkdownAdvancedProps {
	content: string;
}

const MarkdownAdvanced: React.FC<MarkdownAdvancedProps> = ({
	content,
}): ReactNode => {
	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm, remarkMath]}
			rehypePlugins={[rehypeKatex, rehypeHighlight]}
		>
			{content}
		</ReactMarkdown>
	);
};

export default MarkdownAdvanced;
