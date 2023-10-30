import { camelToKebabCase } from "./camelToKebabCase";

function keys<T extends object, K extends keyof T>(object: T): K[] {
	return Object.keys(object) as K[];
}

export function cssObjectToString(css: object) {
	return keys(css)
		.reduce(
			(acc, rule) =>
				css[rule] !== undefined ? `${acc}--${camelToKebabCase(rule)}:${css[rule]};` : acc,
			""
		)
		.trim();
}
