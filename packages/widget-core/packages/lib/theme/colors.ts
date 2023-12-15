import { generate } from "@ant-design/colors";
import { getAlphaColor, getSolidColor } from "./colorAlgorithm";
import type { GenerateColorMap, GenerateNeutralColorMap } from "../types/theme";

export const generateColorPalettes: GenerateColorMap = (
	baseColor: string,
	scheme: string,
) => {
	if (scheme === "dark") {
		const colors = generate(baseColor, { theme: "dark" });
		return {
			1: colors[0],
			2: colors[1],
			3: colors[2],
			4: colors[3],
			5: colors[6],
			6: colors[5],
			7: colors[4],
			8: colors[6],
			9: colors[5],
			10: colors[4]
		};
	}

	const colors = generate(baseColor);
	return {
		1: colors[0],
		2: colors[1],
		3: colors[2],
		4: colors[3],
		5: colors[4],
		6: colors[5],
		7: colors[6],
		8: colors[4],
		9: colors[5],
		10: colors[6]
	};
};

export const generateNeutralColorPalettes: GenerateNeutralColorMap = (
	bgBaseColor: string,
	textBaseColor: string,
	scheme: string,
) => {
	if (scheme === "dark") {
		const colorBgBase = bgBaseColor || "#000";
		const colorTextBase = textBaseColor || "#fff";

		return {
			colorText: getAlphaColor(colorTextBase, 0.85),
			colorTextSecondary: getAlphaColor(colorTextBase, 0.65),
			colorTextTertiary: getAlphaColor(colorTextBase, 0.45),
			colorTextQuaternary: getAlphaColor(colorTextBase, 0.25),

			colorFill: getAlphaColor(colorTextBase, 0.18),
			colorFillSecondary: getAlphaColor(colorTextBase, 0.12),
			colorFillTertiary: getAlphaColor(colorTextBase, 0.08),
			colorFillQuaternary: getAlphaColor(colorTextBase, 0.04),

			colorBgContainer: getSolidColor(colorBgBase, 8, "dark"),

			colorBorder: getSolidColor(colorBgBase, 26, "dark")
		};
	}

	const colorBgBase = bgBaseColor || "#fff";
	const colorTextBase = textBaseColor || "#000";

	return {
		colorText: getAlphaColor(colorTextBase, 0.88),
		colorTextSecondary: getAlphaColor(colorTextBase, 0.65),
		colorTextTertiary: getAlphaColor(colorTextBase, 0.45),
		colorTextQuaternary: getAlphaColor(colorTextBase, 0.25),

		colorFill: getAlphaColor(colorTextBase, 0.15),
		colorFillSecondary: getAlphaColor(colorTextBase, 0.06),
		colorFillTertiary: getAlphaColor(colorTextBase, 0.04),
		colorFillQuaternary: getAlphaColor(colorTextBase, 0.02),

		colorBgContainer: getSolidColor(colorBgBase, 0, "light"),

		colorBorder: getSolidColor(colorBgBase, 15, "light")
	};
};
