import type { Writable } from "svelte/store";

export type IFeedbackForm = {
	content: string;
};

export type IFeedback = IFeedbackForm & {
	projectId: string;
	meta: object | null;
};

export type WidgetContext = {
	projectId: string;
	position: "left" | "right";
	theme: ThemeProps;
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
};
