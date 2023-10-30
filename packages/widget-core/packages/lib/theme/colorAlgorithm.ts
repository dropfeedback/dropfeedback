import { TinyColor } from "@ctrl/tinycolor";

export const getAlphaColor = (baseColor: string, alpha: number) =>
	new TinyColor(baseColor).setAlpha(alpha).toRgbString();

export const getSolidColor = (baseColor: string, brightness: number, scheme: "dark" | "light") => {
	const instance = new TinyColor(baseColor);

	if (scheme === "light") {
		return instance.darken(brightness).toHexString();
	}

	return instance.lighten(brightness).toHexString();
};
