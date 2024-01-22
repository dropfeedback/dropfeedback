<script lang="ts">
	import { generateColorPalettes, generateNeutralColorPalettes } from "../theme/colors";
	import seedToken from "../theme/seed";
	import { cssObjectToString } from "../utils/cssObjectToString";
	import type { ThemeProps } from "../types";

	const { borderRadius, motionEaseInOut } = seedToken;

	export let theme: ThemeProps;

	$: primaryColors = generateColorPalettes(theme.primaryColor, theme.scheme);

	$: neutralColors = generateNeutralColorPalettes(
		theme.backgroundColor,
		theme.textColor,
		theme.scheme
	);

	$: styles = {
		...neutralColors,

		colorPrimaryBg: primaryColors[1],
		colorPrimaryBorder: primaryColors[3],
		colorPrimaryHover: primaryColors[5],
		colorPrimary: primaryColors[6],
		colorPrimaryActive: primaryColors[7],

		colorSuccess: "#0070f3",

		borderRadius,
		motionEaseInOut
	};

	$: stringStyles = cssObjectToString(styles);
</script>

<aside style={stringStyles}>
	<slot />
</aside>

<style>
	aside {
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
