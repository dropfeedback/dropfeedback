export type IFeedbackForm = {
	content: string;
};

export type IFeedback = IFeedbackForm & {
	projectId: string;
	meta: object | null;
};

export type WidgetProps = {
	projectId?: string;
	meta?: object | null;
};

export type Steps = "category" | "form" | "success";
