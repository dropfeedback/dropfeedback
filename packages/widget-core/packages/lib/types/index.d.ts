export type IFeedback = {
	projectId: string;
	content: string;
	meta: Record<string, any>;
	category: Categories;
};

export type WidgetContext = {
	projectId?: string;
	defaultButton: DefaultButtonProps;
	theme: ThemeProps;
	meta: Record<string, any>;
};

export type DefaultButtonPosition = "left" | "right";

export type DefaultButtonProps = {
	position: DefaultButtonPosition;
	enabled: boolean;
};

export type ThemeProps = {
	scheme: "light" | "dark";
	primaryColor: string;
	backgroundColor: string;
	textColor: string;
};

export type PopoverContext = Omit<WidgetContext, "defaultButton"> & {
	open: boolean;
	side: PopoverSide;
	sideOffset: number;
	currentStep: Steps;
	selectedCategory: Categories | null;
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

export type Categories = "issue" | "idea" | "other";
