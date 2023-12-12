<script lang="ts">
	import { afterUpdate, getContext } from "svelte";
	import type { Writable } from "svelte/store";
	import { generateColorPalettes, generateNeutralColorPalettes } from "../theme/colors";
	import { cssObjectToString } from "../utils/cssObjectToString";
	import seedToken from "../theme/seed";
	import type { PopoverContext } from "../types";

	const { borderRadius, motionEaseInOut } = seedToken;

	const popoverContext = getContext<Writable<PopoverContext>>("popoverContext");

	$: primaryColors = generateColorPalettes(
		$popoverContext.theme.primaryColor,
		$popoverContext.theme.scheme
	);

	$: neutralColors = generateNeutralColorPalettes(
		$popoverContext.theme.backgroundColor,
		$popoverContext.theme.textColor,
		$popoverContext.theme.scheme
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
