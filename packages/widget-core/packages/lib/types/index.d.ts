import type { Writable } from "svelte/store";

export type IFeedbackForm = {
	content: string;
};

export type IFeedback = IFeedbackForm & {
	projectId: string;
	meta: Record<string, any>;
};

export type GlobalWidgetContext = {
	projectId?: string;
	position?: "left" | "right";
	theme: Partial<ThemeProps>;
	meta: Record<string, any>;
};

export type WidgetProps = {
	projectId: string;
	position: "left" | "right";
	theme: ThemeProps;
	meta: Record<string, any>;
};

export type ThemeProps = {
	scheme: "light" | "dark";
	primaryColor: string;
	backgroundColor: string;
	textColor: string;
};

export type Steps = "category" | "form" | "success";

export type Categories = "issue" | "idea" | "other" | null;

export type ConfigContext = {
	showPopper: Writable<boolean>;
	currentStep: Writable<Steps>;
	selectedCategory: Writable<Categories>;
	props: WidgetProps;
};
