export const getWindowSize = (): string => {
	const width = window.innerWidth;
	const height = window.innerHeight;

	return `${width}x${height}`;
};
