export type IFeedbackForm = {
	content: string;
};

export type IFeedback = IFeedbackForm & {
	projectId: string;
	meta: object | null;
};
