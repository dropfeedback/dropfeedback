export const stringToBoolean = (value: string | boolean | undefined): boolean | undefined => {
	if (value === undefined) {
		return undefined;
	}

	if (typeof value === "boolean") {
		return value;
	}

	if (typeof value === "string") {
		if (value === "true") {
			return true;
		}

		if (value === "false") {
			return false;
		}
	}
};
