import type { IFeedback } from "../types";

export const API_URL =
	import.meta.env.MODE === "production"
		? "https://dropfeedback-prod.up.railway.app"
		: "http://localhost:8080";

export const sendFeedback = async (feedback: IFeedback) => {
	try {
		const response = await fetch(`${API_URL}/feedbacks`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(feedback)
		});

		const body = await response.json();

		if (!response.ok) {
			throw new Error(body.message);
		}

		return body;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		} else {
			throw new Error("An unknown error occurred.");
		}
	}
};
