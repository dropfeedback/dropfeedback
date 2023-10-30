export interface ColorMap {
	1: string;
	2: string;
	3: string;
	4: string;
	5: string;
	6: string;
	7: string;
	8: string;
	9: string;
	10: string;
}

export interface ColorNeutralMapToken {
	colorText: string;
	colorTextSecondary: string;
	colorTextTertiary: string;
	colorTextQuaternary: string;
	colorFill: string;
	colorFillSecondary: string;
	colorFillTertiary: string;
	colorFillQuaternary: string;
	colorBorder: string;
	colorBgContainer: string;
}

export type GenerateColorMap = (baseColor: string, scheme: "dark" | "light") => ColorMap;
export type GenerateNeutralColorMap = (
	bgBaseColor: string,
	textBaseColor: string,
	scheme: "dark" | "light"
) => ColorNeutralMapToken;
