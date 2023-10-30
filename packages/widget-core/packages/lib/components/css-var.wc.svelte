<script lang="ts">
	import { getContext } from "svelte";
	import { generateColorPalettes, generateNeutralColorPalettes } from "../theme/colors";
	import { cssObjectToString } from "../utils/cssObjectToString";
	import seedToken from "../theme/seed";
	import type { WidgetProps } from "../types";

	const { theme } = getContext<WidgetProps>("widgetProps");
	const { colorPrimary, colorBgBase, colorTextBase, borderRadius, motionEaseInOut } = seedToken;

	// Default values for theme
	const themeScheme = theme?.scheme ?? "light";
	const themePrimaryColor = theme?.primaryColor ?? colorPrimary;
	const themeBackgroundColor = theme?.backgroundColor ?? colorBgBase;
	const themeTextColor = theme?.textColor ?? colorTextBase;

	const primaryColors = generateColorPalettes(themePrimaryColor, themeScheme);
	const neutralColors = generateNeutralColorPalettes(
		themeBackgroundColor,
		themeTextColor,
		themeScheme
	);

	const styles = {
		...neutralColors,

		colorPrimaryBorder: primaryColors[3],
		colorPrimaryHover: primaryColors[5],
		colorPrimary: primaryColors[6],
		colorPrimaryActive: primaryColors[7],

		borderRadius,
		motionEaseInOut
	};

	const stringStyles = cssObjectToString(styles);
</script>

<aside style={stringStyles}>
	<slot />
</aside>
