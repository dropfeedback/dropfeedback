<script lang="ts">
	import { afterUpdate, getContext } from "svelte";
	import type { Writable } from "svelte/store";
	import { generateColorPalettes, generateNeutralColorPalettes } from "../theme/colors";
	import { cssObjectToString } from "../utils/cssObjectToString";
	import seedToken from "../theme/seed";
	import type { WidgetProps } from "../types";
	import type { ColorMap, ColorNeutralMapToken } from "../types/theme";

	const widgetPropsContext = getContext<Writable<WidgetProps>>("widgetProps");

	let primaryColors: ColorMap;
	let neutralColors: ColorNeutralMapToken;
	let styles: Record<string, string>;
	let stringStyles: string;

	afterUpdate(() => {
		const { colorPrimary, colorBgBase, colorTextBase, borderRadius, motionEaseInOut } = seedToken;
		const {
			scheme = "light",
			primaryColor = colorPrimary,
			backgroundColor = colorBgBase,
			textColor = colorTextBase
		} = $widgetPropsContext;

		primaryColors = generateColorPalettes(primaryColor, scheme);
		neutralColors = generateNeutralColorPalettes(backgroundColor, textColor, scheme);
		styles = {
			...neutralColors,

			colorPrimaryBorder: primaryColors[3],
			colorPrimaryHover: primaryColors[5],
			colorPrimary: primaryColors[6],
			colorPrimaryActive: primaryColors[7],

			borderRadius,
			motionEaseInOut
		};
		stringStyles = cssObjectToString(styles);
	});
</script>

<aside style={stringStyles}>
	<slot />
</aside>
