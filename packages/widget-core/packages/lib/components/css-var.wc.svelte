<script lang="ts">
	import { generateColorPalettes, generateNeutralColorPalettes } from "../theme/colors";
	import { cssObjectToString } from "../utils/cssObjectToString";
	import seedToken from "../theme/seed";
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

		colorPrimaryBorder: primaryColors[3],
		colorPrimaryHover: primaryColors[5],
		colorPrimary: primaryColors[6],
		colorPrimaryActive: primaryColors[7],

		borderRadius,
		motionEaseInOut
	};

	$: stringStyles = cssObjectToString(styles);
</script>

<aside style={stringStyles}>
	<slot />
</aside>
