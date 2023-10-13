import type { IFeedback } from "../types";

export const sendFeedback = async (feedback: IFeedback) => {
  try {
    const response = await fetch("http://localhost:3001/feedbacks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedback),
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message);
    }

    return body;
  } catch (error: any) {
    throw new Error(error);
  }
};
