export type IFeedback = {
	projectId: string;
	content: string;
	meta: Record<string, any>;
	category: Categories;
};

export type ThemeProps = {
	scheme: string;
	primaryColor: string;
	backgroundColor: string;
	textColor: string;
};

export type PopoverSide =
	| "auto"
	| "auto-start"
	| "auto-end"
	| "left"
	| "right"
	| "top"
	| "bottom"
	| "top-start"
	| "top-end"
	| "bottom-start"
	| "bottom-end"
	| "right-start"
	| "right-end"
	| "left-start"
	| "left-end";

export type Steps = "category" | "form" | "success";

export type InlineSteps =  "form" | "success";

export type Categories = "issue" | "idea" | "other";
