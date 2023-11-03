<script lang="ts">
	import "../../lib";

	let themeScheme = "light";
	let position = "right";
	let primaryColor = "#1677ff";
	let textColor = "#171717";
	let backgroundColor = "#fafafa";

	$: {
		document.documentElement.classList.toggle("dark", themeScheme === "dark");
	}

	$: {
		if (themeScheme === "light") {
			textColor = "#171717";
			backgroundColor = "#fafafa";
		} else {
			textColor = "#ededed";
			backgroundColor = "#000000";
		}
	}
</script>

<main>
	<fieldset>
		<legend>Theme:</legend>

		<div>
			<input type="radio" id="light" name="theme" value="light" checked bind:group={themeScheme} />
			<label for="light">Light</label>

			<input type="radio" id="dark" name="theme" value="dark" bind:group={themeScheme} />
			<label for="dark">Dark</label>
		</div>

		<div>
			<div>
				<input type="color" id="primaryColor" bind:value={primaryColor} />
				<label for="primaryColor">Primary Color</label>
			</div>

			<div>
				<input type="color" id="backgroundColor" bind:value={backgroundColor} />
				<label for="backgroundColor">Background Color</label>

				<input type="color" id="textColor" bind:value={textColor} />
				<label for="textColor">Text Color</label>
			</div>
		</div>
	</fieldset>
	<fieldset>
		<legend>Positon:</legend>

		<div>
			<input type="radio" id="right" name="position" value="right" checked bind:group={position} />
			<label for="right">Right</label>

			<input type="radio" id="left" name="position" value="left" bind:group={position} />
			<label for="left">Left</label>
		</div>
	</fieldset>

	<img class={`arrow arrow-${position} arrow-${themeScheme}`} src="/arrow.svg" alt="Arrow" />

	<feedbacky-widget
		project-id="24320d3d-c5f2-44e1-83a1-13e1cb61fe1d"
		theme-scheme={themeScheme}
		theme-primary-color={primaryColor}
		theme-text-color={textColor}
		theme-background-color={backgroundColor}
		{position}
	/>
</main>
